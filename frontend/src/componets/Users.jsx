import { Link } from "react-router-dom"

export default function Users({ user }) {
  return (
    <>
      <div className="mt-4 space-y-4">
        {user.length > 0 ? (
          user.map((draft) => (
            <div
              key={draft._id}
              className="p-4 flex justify-between items-center bg-paleGray max-w-screen-lg mx-auto border border-mediumGray rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h1 className="text-lg font-semibold text-darkGray">
                Name: <span className="font-normal text-mediumGray">{draft.firstName}</span>
              </h1>
              <Link
                to="/send"
                state={{ userId: draft._id, user: draft.firstName }}
              >
                <button className="mt-2 px-4 py-2 bg-mediumGray text-white rounded-md hover:bg-darkGray transition-colors">
                  Send money
                </button>
              </Link>
            </div>
          ))
        ) : (
          <div className="p-4 flex justify-center items-center bg-paleGray max-w-screen-lg mx-auto border border-mediumGray rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h1 className="text-lg font-semibold text-darkGray">No users available</h1>
          </div>
        )}
      </div>


    </>
  )
}