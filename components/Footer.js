const Footer = () => {
  return (
    <div
      className=" 
    px-32 pt-14 pb-7 bg-gray-100 "
    >
      <div className="grid grid-col-1 md:grid-cols-4 text-gray-600 space-y-10 md:space-y-0">
        <div className="space-y-4 text-sm text-gray-800">
          <h5 className="font-bold">ABOUT</h5>
          <div className="space-y-2 children:hover:underline children:cursor-pointer children:p-1">
            <p>How Airbnb Work</p>
            <p>Newsroom</p>
            <p>Investors</p>
            <p>Airbnb Plus</p>
            <p>Airbnb Luxe</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800">
          <h5 className="font-bold">COMMUNITY</h5>
          <div className="space-y-2 children:hover:underline children:cursor-pointer children:p-1">
            <p>Accessibility</p>
            <p>This is not s real site</p>
            <p>It's a pretty awesome clone</p>
            <p>Referrals accepted</p>
            <p>SKBoom</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800">
          <h5 className="font-bold">HOST</h5>
          <div className="space-y-2 children:hover:underline children:cursor-pointer children:p-1">
            <p>Next React</p>
            <p>Presents</p>
            <p>Zero to full stack</p>
            <p>React fun</p>
            <p>Join Now</p>
          </div>
        </div>
        <div className="space-y-4 text-sm text-gray-800">
          <h5 className="font-bold">SUPPORT</h5>
          <div className="space-y-2 children:hover:underline children:cursor-pointer children:p-1">
            <p>Help Center</p>
            <p>Trust & Safety</p>
            <p>Say Hi Saad</p>
            <p>Easter Eggs</p>
            <p>For the Win</p>
          </div>
        </div>
      </div>
      <div className="flex text-sm pt-3 border-t border-gray-300 mt-4">
        <h2 className="font-bold text-gray-500">developed by</h2>:&nbsp;
        <a
          href="https://www.upwork.com/freelancers/~013899fa795739a7d8"
          target="_blank"
          className="block hover:underline text-blue-700 font-medium"
        >
          @Saad K.
        </a>
      </div>
    </div>
  );
};

export default Footer;
