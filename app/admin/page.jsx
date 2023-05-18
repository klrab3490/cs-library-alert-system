import Widget from "@components/widget";

const page = () => {
  return (
    <div className="">
      {/* Body */}
      <div className="w-full">
        <div className="gap-4 sm:flex">
          <Widget type="user" />
          <Widget type="books" />
        </div>
      </div>
    </div>
  )
}

export default page;