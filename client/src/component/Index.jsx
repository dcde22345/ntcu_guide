import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const foodRef = useRef(null);
  const lifeRef = useRef(null);
  const shoppingRef = useRef(null);
  const othersRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (foodRef.current) {
        const width = foodRef.current.clientWidth;
        foodRef.current.style.height = `${width}px`;
        lifeRef.current.style.height = `${width}px`;
        shoppingRef.current.style.height = `${width}px`;
        othersRef.current.style.height = `${width}px`;
      }
    };

    window.addEventListener("resize", handleResize);

    // 載入時初始化一次
    handleResize();

    // 頁面跳轉時解除監聽
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="container my-5">
      <form className="d-flex mb-5">
        <input
          className="form-control me-2 w-75"
          type="search"
          placeholder="店家名稱"
        />
        <button
          className="btn btn-outline w-25"
          style={{ borderColor: "#013c4f", color: "#013c4f" }}
          type="submit"
        >
          搜尋
        </button>
      </form>
      <div className="row">
        <div className="col-6">
          <Link
            className="btn btn-block w-100 text-white mb-4 p-3"
            style={{ backgroundColor: "#013c4f" }}
            to="shopInfo"
          >
            <div className="w-100 my-3">
              <img
                ref={foodRef}
                className="w-100 rounded-circle"
                style={{ objectFit: "cover" }}
                src="src/assets/food.jpg"
                alt="美食"
              />
            </div>
            <span className="display-6 fw-bold">美食</span>
          </Link>
        </div>
        <div className="col-6">
          <Link
            className="btn btn-block w-100 text-white mb-4 p-3"
            style={{ backgroundColor: "#013c4f" }}
            to="shopInfo"
          >
            <div className="w-100 my-3">
              <img
                ref={lifeRef}
                className="w-100 rounded-circle"
                style={{ objectFit: "cover" }}
                src="src/assets/life.jpg"
                alt="生活"
              />
            </div>
            <span className="display-6 fw-bold">生活</span>
          </Link>
        </div>
        <div className="col-6">
          <Link
            className="btn btn-block w-100 text-white mb-4 p-3"
            style={{ backgroundColor: "#013c4f" }}
            to="shopInfo"
          >
            <div className="w-100 my-3">
              <img
                ref={shoppingRef}
                className="w-100 rounded-circle"
                src="src/assets/shopping.png"
                style={{ objectFit: "cover" }}
                alt="購物"
              />
            </div>
            <span className="display-6 fw-bold">購物</span>
          </Link>
        </div>
        <div className="col-6">
          <Link
            className="btn btn-block w-100 text-white mb-4 p-3"
            style={{ backgroundColor: "#013c4f" }}
            to="shopInfo"
          >
            <div className="w-100 my-3">
              <img
                ref={othersRef}
                className="w-100 rounded-circle"
                src="src/assets/others.jpg"
                style={{ objectFit: "cover" }}
                alt="其他"
              />
            </div>
            <span className="display-6 fw-bold">其他</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Index;
