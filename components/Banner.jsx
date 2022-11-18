import MultipleObserver from "../utils/multipleObserver";

const Banner = () => {
  return (
    <div className="banner">
      <section className="quote">
        <div className="title">
          <MultipleObserver>
            <img src="/images/text-commit01.svg" alt="幸一光の" />
          </MultipleObserver>

          <MultipleObserver>
            <img src="/images/text-commit02.svg" alt="想い" />
          </MultipleObserver>
        </div>

        <div className="image">
          <img src="/images/kodawari.jpg" alt="" className="quote-image" />
          <img src="/images/kodawari02.jpg" alt="" className="quote-image-sp" />
        </div>
        <div className="content">
          <p className="content-title">
            いちばんさいしょの
            <br />
            いちばんおおきなおくりもの
          </p>

          <p className="content-text">
            お求めになる方にとって、一つのお人形が本当に大切なお人形であることを幸一光は知っております。
          </p>
          <p className="content-button">詳しくはこちら</p>
        </div>
      </section>
      <section className="info">
        <div className="tech">
          <div className="title">
            <MultipleObserver>
              <img src="/images/text-method.svg" alt="継承される技術" />
            </MultipleObserver>
          </div>

          <div className="content">
            <p className="content-text">
              100年以上の歴史を持つ伝統的工芸品、幸一光では「江戸木目込人形」「江戸節句人形」という二つの技術を継承しております。
            </p>
          </div>

          <div className="image">
            <img src="/images/top-hina.jpg" alt="江戸木目込人形" />
            <img src="/images/top-gogatsu.jpg" alt="江戸節句人形" />
          </div>
        </div>

        <div className="greet">
          <div className="title">
            <MultipleObserver>
              <img src="/images/text-hello01.svg" alt="幸一光からの" />
            </MultipleObserver>

            <MultipleObserver>
              <img src="/images/text-hello02.svg" alt="ご挨拶" />
            </MultipleObserver>
          </div>

          <div className="image">
            <img src="/images/top-hello.jpg" alt="" />
          </div>

          <div className="content">
            <p className="content-text">
              大正九年、東京の下町、下谷竹町で創業し、100年を迎える松崎人形、その技は三代目松崎幸一光が受け継いでおります。
            </p>

            <p className="content-button">詳しくはこちら</p>
          </div>
        </div>
      </section>
      <section className="show">
        <div className="image">
          <img src="/images/top-showroom.jpg" alt="" />
        </div>

        <div className="title">
          <MultipleObserver>
            <img src="/images/text-showroom.svg" alt="ショールームのご案内" />
          </MultipleObserver>
        </div>

        <div className="content">
          <p className="content-text">
            大切なお人形を選ぶのだから、実際に見て、手に取ってお選びいただきたい、その想いから、松崎人形では工房併設のショールームをご用意しております。
          </p>

          <div className="content-button">詳しくはこちら</div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
