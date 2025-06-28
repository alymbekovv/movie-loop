import scss from "./Header.module.scss";
import { Badge, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ProfileMenu from "../../../authentication/ProfileMenu/ProfileMenu";
import { IconButton } from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlHeader);
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`${scss.header} ${isVisible ? scss.show : scss.hide}`}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.logo}>
            <Link to="/">
              <h1>MovieLoop</h1>
            </Link>
          </div>
          <nav className={scss.nav}>
            <Link to="/movies">
              <p>Movies</p>
            </Link>

            <Link to="/TVshow"> 
              <p>TV Show</p>
            </Link>
            <p>Series</p>
          </nav>
          <div className={scss.action}>
            <Input
              className={scss.search}
              placeholder="Search..."
              prefix={<SearchOutlined />}
              style={{}}
            />
            <IconButton>
              <Badge size="small" count={5}>
                <BookmarksIcon className={scss.star} />
              </Badge>
            </IconButton>
            <ProfileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
