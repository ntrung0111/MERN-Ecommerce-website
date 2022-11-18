import Link from "next/link";
import { useEffect, useState } from "react";

const Breadcrumb = (props) => {
  const [crumbs, setCrumbs] = useState([]);

  useEffect(() => {
    const formatCrumbs = props.crumbs.filter((item) => item.url && item.title);

    setCrumbs(formatCrumbs);
  }, [props.crumbs]);

  const isLast = (index) => {
    return index === crumbs.length - 1;
  };

  return (
    <ol className="breadcrumb">
      {crumbs.map((crumb, index) => {
        return (
          <li
            key={index}
            className={
              isLast(index) ? "breadcrumb-item is-current" : "breadcrumb-item"
            }
          >
            {isLast(index) ? (
              <span>{crumb.title}</span>
            ) : (
              <Link href={index === 0 ? "/" : `/view/category/${crumb.url}`}>
                <a>
                  <span>{crumb.title}</span>
                </a>
              </Link>
            )}
          </li>
        );
      })}
    </ol>
  );
};

export default Breadcrumb;
