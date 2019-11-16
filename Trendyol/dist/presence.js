var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const presence = new Presence({
    clientId: "643758670131363840"
}),
    pages = {
        "/butik/liste/erkek": "Erkek Giyim",
        "/butik/liste/kadin": "Kadın Giyim",
        "/butik/liste/cocuk": "Çocuk Giyim",
        "/butik/liste/ayakkabi--canta": "Ayakkabı & Çanta",
        "/butik/liste/saat--aksesuar": "Saat & Aksesuar",
        "/kozmetik": "Kozmetik",
        "/ev--yasam": "Ev & Yaşam",
        "/elektronik": "Elektronik",
        "/supermarket": "Süper Market",
        "/yardim/sorular": "Yardım & Destek",
        "/sepetim": "Sepet",
        "/bizeulasin": "Bize Ulaşın",
        "/saticibasvuru": "Satıcı Başvuru",
        "/s/kampanyalar": "Aktif Kampanyalar",
        "/s/elite": "En Trend Ürünler",
        "/login": "Giriş Yap",
        "/Hesabim": "Hesabım",
        "/Hesabim/Degerlendirmelerim": "Değerlendirmelerim",
        "/Hesabim/KullaniciBilgileri": "Kullanıcı Bilgileri",
        "/Hesabim/IndirimKuponlari": "İndirim Kuponları",
        "/Hesabim/AdresBilgileri": "Adres Bilgileri",
        "/Hesabim/KrediKartlarim": "Kredi Kartları",
        "/Hesabim/Elite": "Trendyol Elite",
        "/Hesabim/DuyuruTercihleri": "Duyuru Tercihleri",
        "/Hesabim/Favoriler": "Favoriler"
    };

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const page = document.location.pathname,
        category = document.querySelector("#root > div > div:nth-child(2) > div.filter-sticky-container > div.boutique-detail-component.v-2.timer-none > ul > li.boutique-title > h1") || document.querySelector("#root > div > div:nth-child(2) > div.filter-sticky-container > div.boutique-detail-component.v-2 > ul > li.boutique-title > h1"),
        product = document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > h1 > a"),
        product2 = document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > h1 > span"),
        price = document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > div.pr-bx-w > div > span.prc-slg") || document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > div.pr-bx-w > div > span") || document.querySelector("#product-detail-app > div > div.pr-cn > div.pr-cn-in > div.pr-in-w > div:nth-child(1) > div.pr-in-cn > div.pr-bx-w > div > div.pr-bx-pr-dsc > span"),
        searchingFor = document.querySelector("#search-app > div > div.srch-rslt-cntnt > div.srch-prdcts-cntnr > div.srch-rslt-title > div.srch-ttl-cntnr-wrppr > div > h1")

    if (page.includes("/yardim/sorular/")) {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Yardım & Sorular",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    } else if (page == "/tum--urunler" && document.location.search.includes("?q=") || searchingFor && searchingFor.textContent != "") {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir şey arıyor:",
            state: searchingFor.textContent || "Belirsiz",
            smallImageKey: "search",
            startTimestamp: Math.floor(Date.now() / 1000)
        })
    } else if (category && category.textContent != "") {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir kategoriye göz atıyor:",
            state: category.textContent || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        })
    } else if (product && product2 && product.textContent != "" && product2.textContent != "" && price.textContent != "") {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir ürüne göz atıyor:",
            state: `${product.textContent} | ${product2.textContent} ${price && price.textContent != "" ? `(${price.textContent})`
    : ""}` || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        })
    } else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        })
    } else {
        presence.setActivity({
            largeImageKey: "ty-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        })
    }
}));