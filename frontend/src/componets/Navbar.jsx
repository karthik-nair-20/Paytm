export default function Navbar() {

  function handlelogout() {
    alert("logging out")
  }
  return (
    <>
      <nav className="sticky top-3 z-[9999] w-full max-w-screen-lg mx-auto px-4 py-2 bg-mediumGray bg-opacity-90 shadow lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-paleGray">
          <a href="#" className="mr-4 block cursor-pointer py-1.5 text-base font-semibold text-paleGray">
            PayTM
          </a>
          <div className="hidden lg:block">
            <button onClick={handlelogout}>Logout</button>
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center text-xs font-medium uppercase transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
            aria-label="Toggle Menu"
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </>
  )
}