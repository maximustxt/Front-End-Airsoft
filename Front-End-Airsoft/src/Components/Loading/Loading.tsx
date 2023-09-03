import Style from "./Loading.module.css";

const Loading = () => {
  return (
    <>
      <div className={Style.ContainerLoading}>
        <div>
          <div className={Style.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
