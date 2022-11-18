import { Fragment } from "react";
import { useInView } from "react-intersection-observer";

const MultipleObserver = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Fragment>
      {inView ? (
        <div className="emergence" ref={ref} data-emergence="visible">
          {children}
        </div>
      ) : (
        <div className="emergence" ref={ref} data-emergence="hidden">
          {children}
        </div>
      )}
    </Fragment>
  );
};

export default MultipleObserver;
