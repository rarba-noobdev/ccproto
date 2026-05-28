export default function PageHeader({ kicker, title, description, children }) {
  return (
    <section className="border-b border-border-muted">
      <div className="container-max py-40 md:py-56 lg:py-72">
        <div className="grid gap-24 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-[820px]">
            {kicker && <p className="chapter mb-20">{kicker}</p>}
            <h1 className="text-title-h3 font-semibold leading-[1.02] tracking-[-.025em] md:text-title-h2 lg:text-title-h1">
              {title}
            </h1>
            {description && (
              <p className="mt-20 max-w-[560px] text-body-large font-normal leading-[1.5] text-ink-soft">
                {description}
              </p>
            )}
          </div>
          {children && <div className="shrink-0">{children}</div>}
        </div>
      </div>
    </section>
  )
}
