import React, { useState,FC } from 'react';

// 定义数据项的类型
interface AccordionData {
    title: string;
    content: string;
}

// 你可以把这些内容当做“常见问题”或“项目流程”数据来展示
const ACCORDION_DATA = [
  {
    title: "Comment créer un compte?",
    content: "Sur la page d'accueil, cliquez sur 'S'inscrire', remplissez votre informations personnelles et continuez, puis un mail de vérification sera envoyé à votre e-mail, cliquez sur 'Valider' pour finir la création du compte."
  },
  {
    title: "Comment réserver une réunion ?",
    content: "Après la connexion, allez au page RENDEZ-VOUS, ensuite vous pouvez choisir le campus, l'encadrant, la durée, la date et l'heure pour votre réunion."
  },
  {
    title: "Comment changer mon mot de passe ?",
    content: "Cliquez sur '*MOT DE PASSE OUBLIÉ ?', entrez votre adresse e-mail d'inscription, puis un mail pour modifier le mot de passe sera envoyé à votre e-mail."
  },
  {
    title: "Mes données sont-elles sécurisées ?",
    content: "Nous utilisons le chiffrement et l'authentification à deux facteurs pour garantir la sécurité de vos données."
  },
];

// 定义 AccordionItem 的 props 类型
interface AccordionItemProps {
    title: string;
    content: string;
  }

// 单个折叠项组件
const AccordionItem: FC<AccordionItemProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ borderBottom: '1px solid #ccc', margin: '1rem 0' }}>
      <div
        onClick={toggleAccordion}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '0.5rem 0',
        }}
      >
        <h3 style={{ margin: 0 }}>{title}</h3>
        {/* 简单使用 Unicode 箭头，如果需要更丰富的图标，可使用 icon 库 */}
        <span style={{ fontSize: '1.2rem' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </div>
      {isOpen && (
        <p style={{ margin: '0.5rem 0' }}>
          {content}
        </p>
      )}
    </div>
  );
};

// 主组件，遍历并渲染所有折叠项
const ExampleAccordion = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
      <h2>Comment nous contacter ?</h2>
      <p>
        Il existe différents moyens de nous contacter : Par mail à l’adresse contact@junior-atlantique.fr,
        par téléphone au numéro de notre Responsable Développement Commercial, etc.
      </p>

      {/* 分割线，非必需，可按需调整 */}
      <hr />

      {/* 下面是折叠项列表 */}
      {ACCORDION_DATA.map((item, index) => (
        <AccordionItem 
          key={index}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default ExampleAccordion;
