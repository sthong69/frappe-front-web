"use client";

import type {
  MeetingAction,
  MeetingRequest,
} from "@/lib/types/MeetingRequestTypes";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Calendar, Clock, MapPin, MessageSquare, FileText } from "lucide-react";
import { getHours, getMinutes } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDateToFrench, translateMeetingTheme } from "@/lib/utils";
import { useAuth } from "@/context/Auth";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addMeetingAction } from "@/api/MeetingRequestsAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { handleError } from "@/lib/errors/utils";
import { Link } from "@tanstack/react-router";

interface MeetingRecordProps {
  meeting: MeetingRequest;
  action: MeetingAction | undefined;
}

const MeetingRecord = ({ meeting, action }: MeetingRecordProps) => {
  const queryClient = useQueryClient();
  const { userRole } = useAuth();

  const [showActionPlanForm, setShowActionPlanForm] = useState(false);

  const toggleActionPlanForm = () => {
    setShowActionPlanForm(!showActionPlanForm);
  };

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return addMeetingAction(meeting.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["meeting-action", meeting.id],
      });
    },
    onError: (error: AxiosError) => {
      toast.error(handleError(error));
    },
  });

  const formSchema = z.object({
    actionPlan: z.string(),
    notes: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      actionPlan: "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values);
  }

  const personInfo =
    userRole === "ROLE_STUDENT"
      ? `${meeting.supervisor.lastName} ${meeting.supervisor.firstName}`
      : `${meeting.student.lastName} ${meeting.student.firstName}`;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row flex-wrap items-start gap-2 px-6 py-4">
        <div>
          <h3 className="text-lg font-medium md:text-xl">
            Réunion avec {personInfo}
          </h3>
          <p className="text-sm text-muted-foreground">ID: {meeting.id}</p>
        </div>
        <Badge className="ml-auto text-sm">
          {translateMeetingTheme(meeting.theme)}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6 px-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 md:gap-10">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{formatDateToFrench(meeting.startDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>
              {getHours(meeting.startDate)}:
              {getMinutes(meeting.startDate).toString().padStart(2, "0")} -{" "}
              {getHours(meeting.endDate)}:
              {getMinutes(meeting.endDate).toString().padStart(2, "0")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
            <span>{meeting.location}</span>
          </div>
        </div>

        {meeting.requestDescription && (
          <div className="rounded-lg bg-muted p-4">
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h4 className="font-medium">
                Description de la demande par l'étudiant
              </h4>
            </div>
            <p className="whitespace-pre-line text-sm">
              {meeting.requestDescription}
            </p>
          </div>
        )}

        {action ? (
          <div key={action.id} className="rounded-lg bg-muted p-4">
            <div className="mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <h4 className="font-medium">
                Plan d'action : {action.actionPlan}
              </h4>
            </div>
            <p className="whitespace-pre-line text-sm">{action.notes}</p>
          </div>
        ) : (
          <p className="italic">
            Aucun plan d'action n'a encore été ajouté par l'encadrant
          </p>
        )}

        {showActionPlanForm && (
          <div className="rounded-lg bg-muted p-4">
            <h4 className="mb-2 font-medium">Ajouter un plan d'action</h4>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="actionPlan"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Titre du plan d'action"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Commentaire</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-[100px] w-full rounded-md border border-input bg-background p-2"
                          placeholder="Votre commentaire..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleActionPlanForm}
                  >
                    Annuler
                  </Button>
                  <Button size="sm">Enregistrer</Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </CardContent>

      {userRole === "ROLE_SUPERVISOR" && (
        <CardFooter className="justify-between border-t px-6 py-4">
          {!showActionPlanForm && !action && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={toggleActionPlanForm}
            >
              <MessageSquare className="h-4 w-4" />
              Ajouter un plan d'action
            </Button>
          )}
          <Link to={`/dashboard/view-student-profile?id=${meeting.student.id}`}>
            <Button>Voir le profil de l'étudiant</Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default MeetingRecord;
