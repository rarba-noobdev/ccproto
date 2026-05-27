export default function PageHeader({ kicker, title, description, children }) {
  return (
    <section className="pt-10">
      <div className="container-max">
        <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {kicker && <p className="kicker mb-3">{kicker}</p>}
            <h1 className="display-lg max-w-3xl">{title}</h1>
            {description && <p className="mt-4 max-w-xl text-sm leading-6 muted">{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
