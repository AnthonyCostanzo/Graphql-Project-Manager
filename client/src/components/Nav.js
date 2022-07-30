const Nav = () => {
  return (
    <nav className="bg-blue-200 p-5">
      <ul className="flex justify-around">
        {[
          ["Home", "/"],
          ["Create", "/create"],
        ].map(([title, url], index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
