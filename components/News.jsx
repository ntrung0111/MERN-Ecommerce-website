const News = () => {
  return (
    <section className="news">
      <div className="container">
        <div className="news">
          <div className="news-title">
            <p>お知らせ</p>
            <img
              src="/images/icon-detail.svg"
              alt="お知らせ一覧はこちらをクリック"
            />
          </div>

          {/* News */}
          <ul className="news-content">
            <li className="news-content-item">
              <time className="news-content-item-time" dateTime="2019.12.24">
                2019.12.24
              </time>
              <p className="news-content-item-title">
                【重要】HPがご覧頂けない、問い合わせの返信が来ないときは
              </p>
            </li>
            <li className="news-content-item">
              <time className="news-content-item-time" dateTime="2020.12.15">
                2020.12.15
              </time>
              <p className="news-content-item-title">
                ショールームの営業とコロナウイルス感染症対策について
              </p>
            </li>
            <li className="news-content-item">
              <time className="news-content-item-time" dateTime="2020.01.05">
                2020.01.05
              </time>
              <p className="news-content-item-title">
                幸一光　工房併設ショップのご案内
              </p>
            </li>
          </ul>
        </div>

        <div className="guide">
          <div className="guide-container">
            <div className="guide-title">
              <h2>ご利用ガイド</h2>
              <p className="guide-text">配送・送料・お支払いなど</p>
            </div>

            <div className="guide-banner">
              <img src="/images/thumb-anima.png" alt="ご利用ガイド" />
            </div>
          </div>

          <div className="guide-social">
            <img src="/images/icon-insta-pc.svg" alt="FOLLOW US" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;
