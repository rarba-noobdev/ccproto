export default function PageHeader({ kicker, title, description, children }) {
  return (
    <section className="pt-8">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-[34px] border border-[var(--line)] bg-[var(--surface-1)] p-5 shadow-[0_16px_48px_rgba(38,38,38,.07)] md:p-7">
          <div className="pointer-events-none absolute inset-0 opacity-[.55]" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_18%,rgba(250,93,25,.12),transparent_24rem)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(38,38,38,.045)_0_1px,transparent_1px_18px)]" />
          </div>
          <div className="relative z-[1] flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              {kicker && <p className="kicker mb-3">{kicker}</p>}
              <h1 className="display-lg max-w-3xl">{title}</h1>
              {description && <p className="mt-4 max-w-xl text-sm font-semibold leading-6 muted">{description}</p>}
            </div>
            {children && <div className="shrink-0">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  )
}
