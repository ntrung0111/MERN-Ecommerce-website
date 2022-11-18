import { Fragment, useContext } from "react";

import { PageContext } from "../context/PageContext";

const Notify = () => {
  const { notify, setNotify } = useContext(PageContext);

  return (
    <Fragment>
      <div
        className={`notify-overlay ${notify.text ? "notify-is-opened" : ""}`}
      ></div>
      <div
        className={`notify-wrapper ${notify.text ? "notify-is-opened" : ""}`}
      >
        <div className="notify-inner">
          <button
            className="notify-close"
            onClick={() => setNotify({ show: false, text: "" })}
          ></button>
          <p className="error-text">{notify.text ? notify.text : ""}</p>
          <button
            className="notify-confirm"
            onClick={() => setNotify({ show: false, text: "" })}
          >
            OK
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Notify;
