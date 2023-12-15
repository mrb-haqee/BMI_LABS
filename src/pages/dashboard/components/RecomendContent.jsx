import React from "react";
import { Recomendation as img } from "../../images/image";

export function RecomendContent({ reco }) {
  return (
    <div className="rec-content">
      <div className="rec-image">
        {reco === "kardio" ? (
          <img src={img.lari} alt="" />
        ) : reco === "beban" ? (
          <img src={img.beban} alt="" />
        ) : reco === "air" ? (
          <img src={img.air} alt="" />
        ) : reco === "buah" ? (
          <img src={img.buah} alt="" />
        ) : reco === "diet" ? (
          <img src={img.diet} alt="" />
        ) : reco === "karbo" ? (
          <img src={img.karbo} alt="" />
        ) : (
          <img alt="None" />
        )}
      </div>
      <div className="rec-text">
        {reco === "kardio" ? (
          <>
            <h4>Olahraga Kardio</h4>
            <p>
              Olahraga kardio melibatkan aktivitas fisik yang meningkatkan
              denyut jantung dan pernapasan, seperti jogging, bersepeda,
              berenang, dan aerobik. Manfaatnya termasuk peningkatan daya tahan
              kardiovaskular, penurunan berat badan, dan kesehatan mental.
              Jumlah kalori yang terbakar tergantung pada intensitas, durasi,
              berat badan, dan tingkat kebugaran. Sebagai contoh, jogging selama
              30 menit bisa membakar sekitar 240-355 kalori, membantu mencapai
              tujuan kebugaran dan kesehatan secara keseluruhan.
            </p>
          </>
        ) : reco === "beban" ? (
          <>
            <h4>Olahraga Angkat Beban</h4>
            <p>
              Angkat beban adalah latihan resistensi untuk membangun kekuatan
              dan massa otot. Contoh latihannya termasuk squat, bench press,
              deadlift, dan shoulder press. Manfaatnya meliputi peningkatan
              kekuatan, massa otot, dan metabolisme. Meskipun pembakaran
              kalorinya bervariasi, latihan ini memiliki dampak positif pada
              pembentukan otot dan metabolisme basal, meningkatkan pembakaran
              kalori bahkan saat istirahat. Rutin angkat beban membantu mencapai
              kebugaran holistik dan daya tahan tubuh.
            </p>
          </>
        ) : reco === "air" ? (
          <>
            <h4>Minum Air</h4>
            <p>
              Minum air adalah kebiasaan penting untuk menjaga kesehatan. Air
              mendukung fungsi tubuh, termasuk keseimbangan cairan, fungsi
              organ, dan metabolisme. Konsumsi yang cukup membantu menjaga
              hidrasi, optimalisasi fungsi kognitif, dan dukungan sistem
              pencernaan. Disarankan untuk minum sekitar 8 gelas air sehari,
              terutama saat aktivitas fisik, cuaca panas, atau sakit. Kebiasaan
              minum air yang sehat memberikan manfaat besar bagi kesehatan umum.
            </p>
          </>
        ) : reco === "buah" ? (
          <>
            <h4>Mengkonsumsi Buah-buahan</h4>
            <p>
              Mengonsumsi buah-buahan penting untuk kesehatan karena kandungan
              serat, vitamin, dan antioksidannya. Contoh buah-buahan termasuk
              apel, pisang, beri, dan jeruk. Manfaatnya mencakup peningkatan
              kekebalan tubuh, kesehatan jantung, dan pencernaan yang baik.
              Disarankan untuk memasukkan berbagai jenis buah dalam diet
              sehari-hari untuk mendukung kesejahteraan tubuh secara menyeluruh.
            </p>
          </>
        ) : reco === "diet" ? (
          <>
            <h4>Diet</h4>
            <p>
              Makanan diet dirancang untuk mencapai tujuan penurunan berat badan
              atau menjaga kebugaran dengan rendah kalori dan kaya nutrisi.
              Contohnya termasuk sayuran, buah, protein rendah lemak, dan
              karbohidrat kompleks. Kontrol asupan kalori, mendukung penurunan
              berat badan, dan meningkatkan kesehatan. Konsultasi dengan ahli
              gizi penting untuk rencana makanan yang sesuai dengan kebutuhan
              individu, termasuk pengawasan kadar kalori.
            </p>
          </>
        ) : reco === "karbo" ? (
          <>
            <h4>Makanan Berkarbohidrat</h4>
            <p>
              Makanan berkarbohidrat adalah sumber energi utama bagi tubuh. Ini
              mencakup makanan seperti nasi, roti, pasta, kentang, dan sereal.
              Karbohidrat memberikan bahan bakar yang diperlukan untuk aktivitas
              fisik dan fungsi tubuh lainnya. Makanan berkarbohidrat memainkan
              peran penting dalam peningkatan berat badan karena mereka adalah
              sumber energi yang efisien.
            </p>
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
