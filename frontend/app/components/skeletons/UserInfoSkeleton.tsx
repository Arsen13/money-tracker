export default function UserInfoSkeleton() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <div className='flex flex-col gap-4'>
          <div className='skeleton h-4 w-20'></div>
          <div className='skeleton h-4 w-28'></div>
        </div>
      </div>
    </div>
  );
}
