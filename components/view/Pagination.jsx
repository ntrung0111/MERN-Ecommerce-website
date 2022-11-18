import Link from "next/link";

const Pagination = ({ currentPage, pages, url }) => {
  const isCurrentPage = (index) => {
    return index === currentPage;
  };

  const pageItem = () => {
    let items = [];

    for (let i = 1; i <= pages; i++) {
      items.push(
        <li
          key={i}
          className={`pagination-item ${isCurrentPage(i) ? "is-current" : ""}`}
        >
          <Link href={`${url}page=${i}`}>
            <a className="pagination-anchor">{i}</a>
          </Link>
        </li>
      );
    }

    return items;
  };

  return <ol className="pagination">{pageItem()}</ol>;
};

export default Pagination;
