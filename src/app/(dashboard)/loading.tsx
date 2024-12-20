export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-orange rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  )
}
