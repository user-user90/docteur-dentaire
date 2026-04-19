export default function Loading() {
  // Or a custom loading skeleton component
  return (
  <div className="flex items-center  justify-center h-screen ">
  <p className="border-3   border-t-transparent animate-spin w-8 h-8 rounded-full"></p>
   <p className="text-[20px] text-start text-gray-700 mx-2">Loading</p>


  </div>
  )
}