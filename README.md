# Cookie.js
## 1.4.5

<br>

![](https://image.flaticon.com/icons/png/128/164/164659.png)

<br>

> Bu README dosyası dökümantasyon niteliğinde yazılmıştır.

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
    |--router.js
```
Cookie.js kullanırken tüm etkileşim src klasörü içerisinde yapılır.  
assets içerisine resimler, component içerisine bileşenler ve pages içerisine sayfalar koyulur. static klasöründe ise cookie.js kullanırken ihtiyacınız olacak parçalar koyulmuştur.  
config.js sayfanızın head kısmı içerisini düzenler.  
router.js ise hangi isteğe karşılık hangi sayfa bastırılacak onu belirler.
store kalsöründe ise [coox](#coox) bulunur

<br>

## Başlarken
Cookie.js npm e yüklenmemiştir. GitHub üzerinden örnek bir cookie.js dosyası indirerek başlayın.  
Ardından terminal aracılığı ile cookie.js projenize girip
``` npm install ``` yapın, bu sayede gerekli paketler indirilmiş olacaktır. Ardından ``` npm start ``` yaparak cookie.js projeniz ``` localhost:1000 ``` adresinde çalışmaya başlayacaktır.

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

    // coox parametresine sonra deyinilecek
    return { // bir obje return ediliyor
        // html değeri
        // bu değer bastırılacak html kodlarını barındırır
        html: (`
            <h1> ${title} </h1>
            <p> Hello World </p>
        `),
        // html kodları bastırıldıktan sonra 
        // çalışacak işlemleri barındırır
        afterLoad() {
            console.log("Home page...")
        }
    }
}
```

<br>

## Router
Router isteklere verilecek cevapları ve kullanıcının isteği router da bulunmuyorsa default olarak hangi sayfanın bastırılacağını belirtir.

```javascript
// router import ediliyor
import Router from '../managment/router-manager.js'

// isteklere göre yazdırılacak sayfalar
import { Home } from './pages/Home.js' // Home
import { About } from './pages/About.js' // About

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
new Router(cookieRoots).createRouter(DefaultRequire)
```

<br>

## Template
Template sayfanızı kapsayan bir fonksiyondur.  
Tüm sayfalarınız, componentleriniz ve içerikleriniz Template içerisine gelen html parametresinde bulunur.   

```javascript
export const Template = (html) => {
    return (`
        <div class="template">
            ${html}
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

    return {
        html: (`
            ${Header()}
            <h1> ${title} </h1>
            <p> Hello World </p>
        `),
        afterLoad() {
            console.log("Home page...")
        }
    }
}
```

Bileşen kullanımı oldukça basit ve sadedir, fakat işin içine fonksiyon kullanan bileşenler ve parametre alan bileşenler girdiğinde bikaç araca ihtiyaç duyarız  (addComponentFunctions, propTypes)

<br>

## Prop Types
PropTypes bileşenlere gelen parametrelerin gelmek zorunda olup olmadığını ve eğer gelirse değerinin hangi tipte olacağını belirler.  
bir NavLink componenti oluşturlım ve birkaç değer alıp bu değerleri kontrol ettirelim.  
Önce bu bileşene birkaç parametre gönderelim.
> propTypes controlu yapılacak componentlere gönderilen
parametreler mutlaka tek bir obje halinde gönderilmelidir.


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
        gelen props mutalaka obje olmalıdır.
        propTypesControl controls adında
        bir fonksiyon return eder. Bu fonksiyonda kontroller
        bir obje halinde yapılır.
        types.String() içerisine gelen değerin string türünde
        olması gerektiğini belirtir.
        içerisine aldığı true, false parametreleri ise
        bu isimde bir değerin bu bileşene mutlaka
        gönderilmesi gerektiğini belirtir.
        true varilirse: bu değer mutlaka gelmeli geldiğinde ise tipi string 
        olmalı
        false verilirse: bu değer gelmesede olur eğer gelirse tipi string 
        olmalı.
        types.String(true, "/") burada gördüğünüz ikinci
        parametre ise default değeri belirtir.
        Yani istenen prop gelmediğin de geçerli olacak değerdir.
    */
    propTypesControl(props).controls({
        path: types.String(true, "/"),
        text: types.String(false, "", [STRİNG, NUMBER])
        /*
            girilen diğer array parametresi ise gelen prop un başka hangi değerlere sahip olabileceğini belirtir.
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

    return {
        html: (`
            ${Header()}
            <h1> ${title} </h1>
            <p> Hello World </p>
            ${NavLink({path: "/home", text: "Ana sayfaya gitmek için tıklayınız"})}
        `),
        afterLoad() {
            console.log("Home page...")
        }
    }
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
Coox uygulamanızda birden fazla yerde kullancağınız aynı değişkenleri, metodları ve action ları tutacağınız bri kısımdır.

```javascript
import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
    first: ({state, actions}) => {}, // ilk çalışacak işlemler
    state: {}, // durumlar
    mutation: {}, // değişimler
    actions: {} // aksiyonlar
})

// coox işlemleri başlatılıyor
cooxConsumer.createCoox()

export default cooxConsumer
```

Coox dan bir veri çekmek için coox u import etmenize gerek yoktur. Coox içerisindeki state ve actions verileri tüm sayfalara gönderilir.

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
coox da actionlar bir method çalıştırmak istediğinde bunu cooxConsumer dan gelen ``` use ``` ile yapılması gerekir. use ile yapılasının sebebi ise çalıştırdığınız method a state i otamatik göndermeye yarar.
Bir action bir methodu u use ile çalıştırmalıdır.
use ilk parametresi çalışacak method un tam adını alır, ikinci parametre ise çalışacak method a gönderilecek değerlerdir.

```javascript
import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
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
            cooxConsumer.use("namePush", newName)
        }
    }
})

cooxConsumer.createCoox()

export default cooxConsumer
```

### uses
Eğer tek seferde birden fazla method çalıştırmak istiyorsanız bunu uses ile yapabilirsiniz.
uses içerisine bir obje alır. Objedeki her obje adı method ismine karşılık gelir ve değeri ise o method a argüman olarak gönderilir.

```javascript
import Coox from '../../managment/coox-manager.js'

const cooxConsumer = new Coox({
    first: ({state, actions}) => {},
    state: {
        names: ["Polat"]
    },
    mutation: {
        namePush(state, newName) {
            state.names.push(newName)
        },
        removeName(state, name) {
            const index = state.names.indexOf(name)
            state.names.splice(index, 1)
        },
        controls(state) {
            console.log(state.names)
        }
    },
    actions: {
        NAME_CONTROL(newName) {
            cooxConsumer.uses({
                namePush: newName,
                removeName: "Polat",
                controls: ""
            })
        }
    }
})

cooxConsumer.createCoox()

export default cooxConsumer
```

## Mutation History
Her action bir veya birden fazla mutation use ettiği için hangi mutation a hangi veriler gönderildi bunları kontrol etmek bağzen zorlaşır. Tam bu esnada history devreye girer.
History son çalışan mutation ı ve ona gönderilen parametreyi içerisinde saklar.
History görüntülemek için coox içerisinde ``` cooxConsumer.getHistory() ``` diyere son geçmişi çekebilirsiniz.

<br>

## Config
config.js de html dosyanıza eklenecek bir takım dosyaları barındırır ve head kısmı ile ilgilenir.

```javascript
import Config from '../managment/config-manager.js'

const settings = {
    title: "Example Cookie.js App", // sayfa başlığı
    styles: [ // styles klasöründen eklenecek CSS dosyaları
        { rel: "stylesheet", fileName: "index.css" }
    ],
    links: [ // CDN ile eklenecek css dosyaları
        { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }
    ]
}

// yeni ayarların oluşturulması
new Config(settings).configManager()
```

<br>

## Tools
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

### RealHtml
bir değişkenin içerik olarak değişimini sağlar.  

```javascript
import { addComponentFunctions } from '../static/add-component-functions.js'
import { setHtml } from '../static/tools.js'
import RealHtml from '../static/real.js'

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

Tüm dökümantasyanu okuduysanız [Tutorial](https://github.com/polat-poyraz/cookie.js/tree/master/tutorial) inceleyebilirsiniz.