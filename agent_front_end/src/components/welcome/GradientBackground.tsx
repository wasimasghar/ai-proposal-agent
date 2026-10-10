// Optional image: drop a file at src/assets/hero-gradient.png and it is picked up automatically.
// If the file is missing, this glob is empty and only the CSS gradient is shown.
const heroImages = import.meta.glob<string>("../../assets/hero-gradient.png", { eager: true, import: "default" })
const heroImage = Object.values(heroImages)[0]

export function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden bg-background">
      {heroImage && <img src={heroImage} alt="" className="absolute inset-0 size-full object-cover opacity-70" />}

      <div className="absolute -left-[12%] -top-[18%] size-[55vmax] animate-float-slow rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.45),rgba(250,204,21,0)_65%)] blur-3xl" />
      <div className="absolute -right-[18%] top-[18%] size-[50vmax] animate-float-slower rounded-full bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.38),rgba(245,158,11,0)_65%)] blur-3xl" />
      <div className="absolute -bottom-[28%] left-[18%] size-[45vmax] animate-float-slow rounded-full bg-[radial-gradient(circle_at_center,rgba(234,179,8,0.3),rgba(234,179,8,0)_65%)] blur-3xl [animation-delay:-7s]" />

      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,10,10,0.35)_0%,rgba(10,10,10,0.6)_55%,#0A0A0A_100%)]" />
    </div>
  )
}
