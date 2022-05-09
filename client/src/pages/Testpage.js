import React from "react";

const Testpage = () => {
  return (
    <body>
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full block sm:table md:table lg:table">
                <thead className="hidden sm:table-header-group md:table-header-group lg:table-header-group">
                  <tr className="text-xs font-bold tracking-wide text-left uppercase text-purple-200">
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Weeks</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="block sm:table-row md:table-row lg:table-row">
                    <td className="px-4 py-3 block sm:table-cell md:table-cell lg:table-cell">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">Push Pull Legs</p>
                          <p className="text-xs">Jeff Nippard</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      An intermediate-advanced program
                      eeeeeeeeeeeeeeeeeeeeeeeeee
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      Hypertrophy Training
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      4
                    </td>
                  </tr>
                  <tr className="block sm:table-row md:table-row lg:table-row">
                    <td className="px-4 py-3 block sm:table-cell md:table-cell lg:table-cell">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">Push Pull Legs</p>
                          <p className="text-xs">Jeff Nippard</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      An intermediate-advanced program
                      eeeeeeeeeeeeeeeeeeeeeeeeee
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      Hypertrophy Training
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      4
                    </td>
                  </tr>
                  <tr className="block sm:table-row md:table-row lg:table-row">
                    <td className="px-4 py-3 block sm:table-cell md:table-cell lg:table-cell">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">Push Pull Legs</p>
                          <p className="text-xs">Jeff Nippard</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      An intermediate-advanced program
                      eeeeeeeeeeeeeeeeeeeeeeeeee
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      Hypertrophy Training
                    </td>
                    <td className="px-4 py-3 text-sm block sm:table-cell md:table-cell lg:table-cell">
                      4
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2 text-s">
              <span className="text-center">
                <nav aria-label="Table navigation">
                  <span className="px-2 py-1 text-purple-200">Page</span>
                  <ul className="inline-flex items-center">
                    <li>
                      <button className="px-2 py-1 text-purple-200">1</button>
                    </li>
                    <li>
                      <button className="px-2 py-1 text-purple-200">2</button>
                    </li>
                    <li>
                      <button className="px-2 py-1 text-purple-200">3</button>
                    </li>
                    <li>
                      <button className="px-2 py-1 text-purple-200">4</button>
                    </li>
                    <li>
                      <button className="px-2 py-1 text-purple-200">5</button>
                    </li>
                  </ul>
                </nav>
              </span>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
};
export default Testpage;
