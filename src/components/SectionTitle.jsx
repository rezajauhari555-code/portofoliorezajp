function SectionTitle({ eyebrow, title, description, icon }) {
  return (
    <div className="section-heading">
      <div className="section-heading__top">
        {icon ? <div className="section-icon">{icon}</div> : null}
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      <p className="section-description">{description}</p>
    </div>
  )
}

export default SectionTitle
