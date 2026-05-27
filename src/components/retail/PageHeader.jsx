export default function PageHeader({ kicker, title, description, children }) {
  return (
    <section className="border-b border-white/10 bg-white/[.018]">
      <div className="container-max py-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            {kicker && <p className="kicker mb-3">{kicker}</p>}
            <h1 className="max-w-4xl text-4xl font-black tracking-[-.04em] sm:text-5xl">{title}</h1>
            {description && <p className="mt-4 max-w-2xl text-base leading-7 text-white/58">{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
