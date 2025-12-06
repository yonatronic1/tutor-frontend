import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="grid md:grid-cols-2 gap-8 items-center">
      <div className="text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Find the best tutor for you.
        </h1>
        <p className="mt-4 text-white/90 text-lg">
          Discover top tutors for any subject and accelerate your learning journey.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            to="/register"
            className="px-5 py-3 rounded-lg bg-teal-400 text-slate-900 font-bold hover:bg-teal-300 transition"
          >
            Get Started
          </Link>
          <Link
            to="/tutors"
            className="px-5 py-3 rounded-lg bg-white/20 text-white font-semibold hover:bg-white/30 transition"
          >
            Browse Tutors
          </Link>
        </div>
      </div>
      <div className="bg-white/10 rounded-2xl p-8 shadow-xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/20 p-6 text-white">
            <div className="text-sm">Math</div>
            <div className="text-2xl font-bold">Yonatan</div>
            <div className="text-white/80">$30/hr</div>
          </div>
          <div className="rounded-xl bg-white/20 p-6 text-white">
            <div className="text-sm">Physics</div>
            <div className="text-2xl font-bold">Sara</div>
            <div className="text-white/80">$45/hr</div>
          </div>
          <div className="rounded-xl bg-white/20 p-6 text-white">
            <div className="text-sm">Chemistry</div>
            <div className="text-2xl font-bold">Dawit</div>
            <div className="text-white/80">$35/hr</div>
          </div>
          <div className="rounded-xl bg-white/20 p-6 text-white">
            <div className="text-sm">English</div>
            <div className="text-2xl font-bold">Liya</div>
            <div className="text-white/80">$28/hr</div>
          </div>
        </div>
      </div>
    </section>
  );
}