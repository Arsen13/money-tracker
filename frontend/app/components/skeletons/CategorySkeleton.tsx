export default function CategorySkeleton() {
  return (
    <div className='flex w-full flex-wrap justify-center gap-3'>
      <div className='skeleton h-15 w-[calc(50%-10px)]'></div>
      <div className='skeleton h-15 w-[calc(50%-10px)]'></div>
      <div className='skeleton h-15 w-[calc(50%-10px)]'></div>
      <div className='skeleton h-15 w-[calc(50%-10px)]'></div>
      <div className='skeleton h-15 w-[calc(50%-10px)]'></div>
    </div>
  );
}
