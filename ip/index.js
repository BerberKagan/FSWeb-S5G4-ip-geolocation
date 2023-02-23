//axios import buraya gelecek
import axios from 'axios';

var benimIP;


// ------------ değiştirmeyin --------------
// licensed to Ergineer 2022
require("babel-core/register");
require("babel-polyfill");
async function ipAdresimiAl() {
	await axios({
		method: 'get',
		url: 'https://apis.ergineer.com/ipadresim',
	})
		.then(function (response) {
			return response.data
		})
		.then(function (a) {
			benimIP = a
		});
}
// ------------ değiştirmeyin --------------


/*
ADIM 1: axios kullanarak, aşağıdaki URL'ye GET sorgusu atacağız
(tag içindeki yere kendi ipnizi yazarak URL'yi oluşturun):
https://apis.ergineer.com/ipgeoapi/<ipniz>

NOT: Bilgisayarın IP adresini öğrenmek için: https://apis.ergineer.com/ipadresim 
ADIM 5'e gelene kadar fonksiyonunuzu test etmek için ip nizi URL'ye manuel olarak ekleyebilirsiniz.
*/

// Make a request for a user with a given ID
/* axios.get('https://apis.ergineer.com/ipadresim') */

/*
	ADIM 2: Geri döndürülen verileri inceleyin, bu sizin ip bilgileriniz! Bileşen fonksiyonunuzu geliştirmek içindeki bu veri yapısını
	iyice anlamanız gerekmektedir.
	
*/

/*
	ADIM 3: Argümanı sadece 1 nesne kabül eden bir fonksiyon oluşturun.
	DOM metotlarını ve özelliklerini kullanarak, şunları gerçekleştirin:
	
	<div class="card">
	<img src={ülke bayrağı url} />
	<div class="card-info">
		<h3 class="ip">{ip adresi}</h3>
		<p class="ulke">{ülke bilgisi (ülke kodu)}</p>
		<p>Enlem: {enlem} Boylam: {boylam}</p>
		<p>Şehir: {şehir}</p>
		<p>Saat dilimi: {saat dilimi}</p>
		<p>Para birimi: {para birimi}</p>
		<p>ISP: {isp}</p>
	</div>
	</div>
*/

/*
	ADIM 4: API'den alınan verileri kullanarak ADIM 3'te verilen yapıda bir kart oluşturun ve
	bu kartı DOM olarak .cards elementinin içine ekleyin.
*/

/*
	ADIM 5: Manuel olarak eklediğiniz IP adresini dinamiğe dönüştürün.
	Sayfanın en üstünde ---değiştirmeyin--- etiketleri arasında yer alan asenkron ipAdresimiAl() fonksiyonuna
	sorgu atarak bilgisayarınız IP adresini dinamik olarak aldıracaksınız. Bu fonksiyon asenkron olarak çağırıldığında `benimIP` değişkenine
	bilgisayarınızın IP adresini atayacaktır.
	Örnek dinamik URL kullanımı: var url = "https://apis.ergineer.com/ipgeoapi/"+benimIP;
*/

//kodlar buraya gelecek

function getApiDetails() {
	let apiResponse = null;
	axios.get("https://apis.ergineer.com/ipgeoapi/176.33.67.173")
		.then((response) => {
			apiResponse = response.data
		})
		.catch((err) => {
			console.log(err);
		})
		.finally(() => {
			console.log(apiResponse);
		});
}
console.log( getApiDetails());

let kartYapici = (data) => {
	const kart = document.createElement('div');
	kart.classList.add('card');

	const foto = document.createElement('img');
	foto.setAttribute('src', data?.ülkebayrağı);
	kart.append(foto);

	const kartBilgileri = document.createElement('div');
	kartBilgileri.classList.add('card-info');
	kart.append(kartBilgileri);

	const ipBilgisi = document.createElement('h3');
	ipBilgisi.classList.add('ip');
	kartBilgileri.append(ipBilgisi);
	ipBilgisi.textContent = `IP: ${data?.sorgu}`;

	const ulkeBilgisi = document.createElement('p');
	ulkeBilgisi.classList.add('ulke');
	kartBilgileri.append(ulkeBilgisi);
	ulkeBilgisi.textContent = `${data?.ülke} (${data?.ülkeKodu})`;

	const enlemBilgisi = document.createElement('p');
	kartBilgileri.append(enlemBilgisi);
	enlemBilgisi.textContent = `Enlem: ${data?.enlem} Boylam: ${data?.boylam}`;

	const sehirBilgisi = document.createElement('p');
	kartBilgileri.append(sehirBilgisi);
	sehirBilgisi.textContent = `Şehir: ${data?.şehir}`;

	const saatBilgisi = document.createElement('p');
	kartBilgileri.append(saatBilgisi);
	saatBilgisi.textContent = `Saat Dilimi: ${data?.saatdilimi}`;

	const paraBilgisi = document.createElement('p');
	kartBilgileri.append(paraBilgisi);
	paraBilgisi.textContent = `Para Birimi: ${data?.parabirimi}`;

	const ispBilgisi = document.createElement('p');
	kartBilgileri.append(ispBilgisi);
	ispBilgisi.textContent = `ISP: ${data?.isp}`;

	return kart;
}

const cardContainer = document.querySelector('.cards');

const connect = async function () {
	await ipAdresimiAl();
	axios
		.get("https://apis.ergineer.com/ipgeoapi/" + benimIP)
		.then((response) => {
			cardContainer.append(kartYapici(response.data));
		})
};
connect();