interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="container">
        <span className="section-eyebrow">{eyebrow}</span>
        <h1 className="page-header-title">{title}</h1>
        <p className="page-header-sub">{subtitle}</p>
      </div>
      <div className="page-header-bar" />
    </header>
  );
}
