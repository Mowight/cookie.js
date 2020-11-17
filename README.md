# Cookie.js

Version | 1.4.7
:---: | :---:

Author | Polat Poyraz
:---: | :---:

<br>
<br>

![](https://image.flaticon.com/icons/png/128/164/164659.png)

<br>

> ℹ️ Bu README dosyası dökümantasyon niteliğinde yazılmıştır.

## İçerik
1. [Nedir?](#nedir)  
2. [Klasör Yapısı](#klasör-yapısı)  
3. [Başlarken](#başlarken)  
4. [Temel Aktarmalar](#temel-aktarmalar)  
5. [Router](#router)  
6. [Template](#template)  
7. [Component](#component)  
8. [propTypes](#prop-types)  
9. [Component fonksyionları](#addcomponentfunctions)
10. [Coox](#coox)
11. [Config](#config)
12. [Tools](#tools)
13. [Reals](#reals)

<br>
<br>

## Nedir
Cookie.js web sayfalarınızın ön yüzünü dinamik halde, vanilya javascript kullanarak yazmanızı sağlayan bir kütüphanedir.  
Cookie.js kullanarak daha kontrollü şekilde web sitelerinizi inşa edin.

> ℹ️ Cookie.js kullanmadan önce temel javascript bilginizin iyi olduğundan emin olun.

<br>

## Klasör Yapısı
```
|--managment  
|--public  
|--src  
    |--assets  
    |--components  
    |--static  
    |--pages  
    |--store  
    |--Template.js  
    |--config.js  
    |--index.js
```
Cookie.js kullanırken tüm etkileşim src klasörü içerisinde yapılır.  
assets içerisine resimler, component içerisine bileşenler ve pages içerisine sayfalar koyulur. static klasöründe ise cookie.js kullanırken ihtiyacınız olacak parçalar koyulmuştur.  
config.js sayfanızın head kısmı içerisini düzenler.  
index.js ise hangi isteğe karşılık hangi sayfa bastırılacak onu belirler.
store kalsöründe ise [coox](#coox) bulunur

<br>

## Başlarken
Cookie.js npm e yüklenmemiştir. GitHub üzerinden örnek bir cookie.js dosyası indirerek başlayın.  
Ardından terminal aracılığı ile cookie.js projenize girip
``` npm install ``` yapın, bu sayede gerekli paketler indirilmiş olacaktır. Ardından ``` npm start ``` yaparak cookie.js projeniz ``` localhost:1000 ``` adresinde çalışmaya başlayacaktır.

> ⚠️  Aynı anda birden fazla cookie projesini npm de çalıştırmak hataya yol açabilir.

<br>

## Temel Aktarmalar
Cookie.js de sayfalar ve component ler javascript dosyalarında birer string olarak html kodu return eder.  
Sayfalar buna ek olarak birde afterLoad metodu return eder.
afterLoad metodu html kodları sayfaya bastırıldıktan sonra çalışacak işlemleri içerisinde barındırır.  
Her fonksiyon ve component export edilir.  
html kodları eğik tırnak içerisine yazılır ``` `` ```
bu sayede javascript kodunu string içerisine gömebiliriz.


```javascript
// Home fonksiyonunun export edilmesi
export const Home = (coox) => {
    const title = "Cookie.js"

    // html kodları
    const html = (`
        <h1> ${title} </h1>
        <p> Hello World </p>
    `)

    const afterLoad = () => {
        // html kodları bastırıldıktan sonra çalışacak işlemler
        console.log("Home page...")
    }

    return {html, afterLoad} // html mutalak return edilmeli
}
```

<br>

## Router
Router isteklere verilecek cevapları ve kullanıcının isteği router da bulunmuyorsa default olarak hangi sayfanın bastırılacağını belirtir.

```javascript
// isteklere göre yazdırılacak sayfalar
import { Home } from './pages/Home.js' // Home
import { About } from './pages/About.js' // About

// Uygulama
import App from '../managment/cookie.js'

/*
eğer kullanıcının isteği hiçbir istek ile
eşdeğer değil ise, yazdırılacak sayfayı import ediyoruz
*/
import { DefaultRequire } from './static/default-require.js'

const cookieRoots = [ // her root birer objedir
    {
        path: "/", // istek
        page: Home // cevap
    },
    {
        path: "/about",
        page: About
    }
]

// yeni bir router oluşturuluyor
App.createRouter(cookieRoots, DefaultRequire)
```

<br>

## Template
Template sayfanızı kapsayan bir fonksiyondur.  
Tüm sayfalarınız, componentleriniz ve içerikleriniz Template içerisine gelen view parametresinde bulunur.   

```javascript
export const Template = (view) => {
    return (`
        <div class="template">
            ${view}
        </div>
    `)
}
```

<br>

## Component
Cookie.js de bileşenler sayfalara benzerdir fakat içerisinde birden fazla özellik kullanma imkanı sağlarlar.  
Bileşenlerde afterLoad özelliği yoktur.  

```javascript
export const Header = (props) => {
    return (`
        <div class="header">
            <div class="left">
                <h1> Logo </h1>
            </div>
            <div class="right">
                < back
            </div>
        </div>
    `)
}
```

Header adında oluşturulan bileşenin kullanımı şu şekildedir.

```javascript
import { Header } from '../components/header.js'

export const Home = (coox) => {
    const title = "Cookie.js"

    const html = (`
        ${Header()}
        <h1> ${title} </h1>
        <p> Hello World </p>
    `)

    const afterLoad = () => {
        console.log("Home page...")
    }

    return {html, afterLoad}
}
```

Bileşen kullanımı oldukça basit ve sadedir, fakat işin içine fonksiyon kullanan bileşenler ve parametre alan bileşenler girdiğinde bikaç araca ihtiyaç duyarız  (addComponentFunctions, propTypes)

<br>

## Prop Types
PropTypes bileşenlere gelen parametrelerin gelmek zorunda olup olmadığını ve eğer gelirse değerinin hangi tiplerde olacağını belirler.  
Bir NavLink componenti oluşturalım ve birkaç değer alıp bu değerleri kontrol ettirelim.  
Önce bu bileşene birkaç parametre gönderelim.

> ⚠️ propTypes a gönderilen props parametersi ve controls e gönderilen parametre mutlaka obje olmalıdır.

```javascript
// propTypesControl ve typesConsumer import edildi
import { propTypesControl, typesConsumer, STRİNG, NUMBER } from '../static/prop-type-control.js'

export const NavLink = (props) => {
    /*
        typesConsumer bize tipleri belirlememizde yardımcı olan bir
        tüketicidir.  
        içerisinde prop ların tiplerini ve zorunluluğunu belirleyeceğimiz
        değerler bulunur.
        bir değişkene atayıp onu çalıştırarak tüketebilirsiniz.
    */
    const types = typesConsumer()

    /*
        propTypesControl fonksiyonu
        içerisine üzerinden control yapacağı objeyi alır.
        propTypesControl controls adında
        bir fonksiyon return eder. Bu fonksiyonda kontroller
        bir obje halinde yapılır.
        örneğin types.String() içerisine gelen değerin string türünde
        olması gerektiğini belirtir.
        içerisine aldığı true, false parametreleri ise
        bu isimde bir değerin bu bileşene mutlaka
        gönderilmesi gerektiğini belirtir.
        true varilirse: bu değer mutlaka gelmeli
        false verilirse: bu değer gelmesede olur
    */
    propTypesControl(props).controls({
        path: types.String(true),
        text: types.String(false, [STRİNG, NUMBER])
        /*
            girilen diğer array parametresi ise gelen prop tipinin
            başka hangi tiplere sahip olabileceğini belirtir.
            Ve diğer type ları yazarken yazım yanlışı olmaması için
            prop-type-control.js den key olarak alınır.
            import { propTypesControl, typesConsumer, STRİNG, NUMBER } from '../static/prop-type-control.js'
                                                        |       |
        */
    })

    /*
        typelar:
            types.String()
            types.Number()
            types.Boolean()...
    */

    return (`<a href="${props.path}"> ${props.text} </a>`)
}
```

```javascript
import { Header } from '../components/header.js'
import { NavLink } from '../components/NavLink.js'

export const Home = (coox) => {
    const title = "Cookie.js"

    const html = (`
        ${Header()}
        <h1> ${title} </h1>
        <p> Hello World </p>
        ${NavLink({path: "/home", text: "Ana sayfaya gitmek için tıklayınız"})}
    `)

    const afterLoad = () => {
        console.log("Home page...")
    }

    return {html, afterLoad}
}
```

<br>

## addComponentFunctions
Bileşenlerin kendi içerisinde bir fonksiyon oluşturmak ve bunu bir butona atamaya çalışmak bir hataya yol açar, çünki her bileşen çalışır ve biter içerisindeki tüm fonksiyon ve değerler silinir. Bileşen dışarısına oluşturulan fonksiyonlarda çalışmaz çünki bileşen ve sayfalar html dosyasına bağlanmamıştır.  
Bu sorunu çözebilmek için tüm dosyalardan ulaşılabilecek global fonksiyon listesi vardır tabikide tüm fonksiyonları elinizle bu listeye girmeyeceksiniz.  
bir component e özel fonksiyonu sadece o component dosyasında addComponentFunction ile oluşturmanız yeterli  
addComponentFunction bir fonksiyondur içerisine tek bir obje parametresi alır bu obje içerisinde component de kullanacağınız fonksiyonlar bulunur.  
Ve fonksiyonları kullanabilmek için ``` $.functionName() ``` diyerek ulaşılması gerekir.  
Bir button componenti oluşturalım


> ℹ️ Birden fazla kez tekrar eden bir bileşende addComponentFunction kullanıldığında 
eklenecek fonksiyon birkez eklenir ve diğer seferlerde tekrar aynı fonksiyon eklenmez, 
bu sayede aynı fonksiyonun sürekli eklenmeye çalışması önlenir.

```javascript
import { propTypesControl, typesConsumer } from '../static/prop-type-control.js'

// component fonksiyonu eklemek için gereken araç
import { addComponentFunctions } from '../static/add-component-functions.js'

export const NameAlertButton = (props) => {
    const types = typesConsumer()

    propTypesControl(props).controls({
        text: types.String(false, "Click"),
        name: types.String(true)
    })

    addComponentFunctions({
        // örnek bir fonksiyon
        nameAlert: (name) => alert(name)
    })

    return (`
        ${/* $.nameAlert() şeklinde kullanılır. */}
        <button onclick="$.nameAlert('${props.name}')">
            ${props.text}
        </button>
    `)
}
```

<br>

## Coox
Coox global state managment dır yani uygulamadaki verilerere işlemlere heryerden ulaşmayı sağlar.
Cookie.js de işlemlerin çoğu state üzerinden yapılır. store u bir depo olarak veya bir mağza olarak düşünün.

> ℹ️ Genel işlemlerinizi store üzerinde yapın.  
Eğer state üzerinde bir değişiklik yapmak isterseniz bunu mutations dan bir mutation ile yapın.  
Bir mutation çalıştırmak için ise actions içerisine bir action oluşturun ve store.use() ile mutation ı çalıştırın.


```javascript
import Coox from '../../managment/coox-manager.js'

const store = new Coox({
    first: ({state, actions}) => {}, // ilk çalışacak işlemler
    state: {}, // durumlar
    mutation: {}, // değişimler
    actions: {} // aksiyonlar
})

// coox işlemleri başlatılıyor
store.createCoox()

export default store
```

Store dan bir veri çekmek için store u import etmenize gerek yoktur. Store içerisindeki state ve actions verileri tüm sayfalara gönderilir.  
Ancak bir component'den direkt olarak store a ulaşmak isterseniz
```javascript
import store from '../store/index.js'
```
diyerek ulaşabilirsiniz.

```javascript
export const Home = (coox/* state ve actions otomatik gelir. */) => {
    return {
        html: (`
            <h1> ${coox.state.title} </h1>
        `)
    }
}
```

### use
coox da actionlar bir mutation çalıştırmak istediğinde bunu store dan gelen ``` use ``` ile yapması gerekir. use ile yapılasının sebebi ise çalıştırdığınız mutation a state i otamatik göndermeye yarar.
use ilk parametresi çalışacak mutation un tam adını alır, ikinci parametre ise çalışacak mutation a gönderilecek değerlerdir.

```javascript
import Coox from '../../managment/coox-manager.js'

const store = new Coox({
    first: ({state, actions}) => {},
    state: {
        names: []
    },
    mutation: {
        namePush(state, newName) {
            state.names.push(newName)
        }
    },
    actions: {
        ADD_NAME(newName) {
            store.use('namePush', newName)
        }
    }
})

store.createCoox()

export default store
```

### Mutation History
Her action bir veya birden fazla mutation use ettiği için hangi mutation a hangi veriler gönderildi bunları kontrol etmek bağzen zorlaşır. Tam bu esnada history devreye girer.
History son çalışan mutation ı ve ona gönderilen parametreyi içerisinde saklar.
History görüntülemek için store içerisinde ``` store.getHistory() ``` diyerek son geçmişi çekebilirsiniz.

### Test
Bağzı mutation lar uzun işlemler yapıyor olabilir (filtreleme, data dan veri çekme) bu tarz mutasyonların ne kadar sürede çalıştığını öğrenmek için store dan gelen test methodunu kullanıyoruz. Test metodunun aldığı parametreler şunlardır
``` mutation name ```, ``` mutation arguments ```, ``` required time ```, ``` processes to run after ``` 
 ilk önce test yapılacak mutation ın ismi girilir, sonrasında o mutation ın kullanacağı argümanlar gönderilir, ardından bu mutation ın çalışma süresinin en fazla ne kadar olabileceği söylenir (mili saniye cinsinden girilir.) ve bunun ardından tüm test işlemleri bittiğinde çalışacak bir fonksiyon gönderilir. Bu gönderilen fonksiyon bir result parametresi alır, bu parametrede test sonuçları bulunur.

> ℹ️ test ettiğiniz mutation mutlaka return işlemi yapmalıdır.


```javascript
state: {
    content: []
},
mutations: {
    getData: (state, block) => {
        state.content.push(block)
        return fetch("https://jsonplaceholder.typicode.com/posts")
    }
},
actions: {
    SAMPLE_ACTİON: (block) => {
        store.test('getData', block, 100, (result) => {
            console.log(...result) // test sonuçları result parametresi ile çekilir.
            // sonuçları düzgün görüntülemek için ...result diyiniz.
            // sonuçlar konsola yazdırılacak formatta gelir.
        })
    }
}
```

<br>

## Config
config.js de html dosyanıza eklenecek bir takım dosyaları barındırır ve head kısmı ile ilgilenir.

```javascript
import App from '../managment/cookie.js' // uygulamanız

const settings = {
    title: "Example Cookie.js App", // sayfa başlığı
    styles: [
        { rel: "stylesheet", fileName: "index.css" } // styles kalsöründen eklenecek css dosyaları
    ],
    links: [
        // link
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
    ]
}

// uygulama ayarlarının başlatılması.
App.config(settings)
```

<br>

## Tools
> ℹ️ Tool lar bir element e ulaşırken id, class veya, tag name ile ulaşır  
id: #id-name  
class: .class-name  
tag: div  
Gibi ulaşılması gerekir

Vanilya javascript yazdığımız için bağzı işlemleri uzun yoldan halletmek gerekiyor. Cookie.js static dosyasında bulundurduğu tools.js içerisinde sizin birçok işleminizi gerçekleştirecek kısa, basti ve kullanışlı araçlar sunar.  
Çoğu tool etikete ulaşmak için etiket adı id kullanıyor ise #idName class kullanıyor ise .className alır, çünki tool lar genelde querySelector seçicisi kullanır.
bu araçlar şunlardır.

1. [addHtml](#addhtml)
2. [setHtml](#sethtml)
3. [setCss](#setcss)
4. [addEvent](#addevent)
5. [get](#get)
6. [getAll](#getall)
7. [removeEl](#removeel)

### addHtml
addHtml fonksiyonu bir etiketin içerisine birşeyler eklemenizi sağlar.

```javascript
addHtml("#container", () => {
    return "Cookie"
})

// veya

addHtml("#container", "Cookie")
```

### setHtml
setHtml ulaştığınız etiketin içerisini siler ve sizin verdiğiniz değeri koyar ekleme yapmaz değiştirir.

```javascript
setHtml("#container", () => {
    return "Hello World"
})
```

### setCss
setCss ise ulaştığınız bir etiketin css değerlerini değiştirmenizi sağlar. Yine ilk parametresi etiketin adı, id si veya class ismidir. Ancak ikinci parametre olarak bir obje gönderilmeli veya bir fonksiyon ile return edilmelidir.  
Javascript ile değişkenlerde - işareti koyulmayacağından
css syntax ı javascritp içerisinde şu şekilde olmalıdır.

```javascript
setCss("#container", {
    backgroundColor: "black",
    color: "white",
    borderRadius: "10px"
})
```

### addEvent
addEvent seçtiğiniz etikete event atamanızı sağlar.
etiektin selecti event adı ve event olayı parametrelerini alır.  

```javascript
addEvent("#container", "click", () => {
    alert("Cookie.js addEvent Tool")
})
```

### get
bir elementi etiket adı, id adı veya class adı ile çekmenizi sağlar.

```javascript
get("#container")
```

### getAll
gönderdiğiniz id, class veya etiket adına sahip tüm elemanları çeker.

> ℹ️ sonuç node list şeklinde return edilir.
</div>

```javascript
getAll("#container")
```

### removeEl
bir elementi silmek isterseniz remove a etiket adı, class veya id adı göndererek
o elemanı silebilirsiniz.

```javascript
remove(".template")
```

## Reals
Reals bir değişken değiştiğinde onun kullanıldığı yerleri güncelleyemeye ve onu kullanan fonksiyonları değişim olduğunda tekrar çalıştırmaya yarar.  
static dosyasından kullanacağınız real ı import ediniz

> ⚠️ Birden fazla yerde tekrar eden component veya parçacıklarda Real kullanımı önerilmez.

### RealHtml
bir değişkenin içerik olarak değişimini sağlar.  

```javascript
import { addComponentFunctions } from '../static/add-component-functions.js'
import { setHtml } from '../static/tools.js'
import RealHtml from '../static/reals/real-html.js'

export const Count = (id) => {
    const count = new RealHtml(0, "#counter")

    count.use((value, id) => {
        setHtml("#test", value)
    })

    addComponentFunctions({
        addCount: (id) => {
            count.set(count.value + 1)
        }
    })

    return (`
        <div style="margin-top: 1em;">

            count: <span id="counter"> ${count.value} </span>

            <span id="test"> 0 </span>

            <button onclick="$.addCount()">
                add count
            </button>
        </div>
    `)
}
```

RealHtml bir etiketin html içeriğini düzenler.

<br>

> ✅ Tüm dökümantasyanu okuduysanız [Tutorial](https://github.com/polat-poyraz/cookie.js/tree/master/tutorial) inceleyebilirsiniz.