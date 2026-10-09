# CSS: Resumo

### 🔍 **Seletores CSS**

```css
/* Seletor universal */
* { font-family: fantasy; }

/* Seletor de elemento */
p { color: blue; }

/* Seletor de classe */
.intro { font-size: 18px; }

/* Seletor de ID */
#menu { background-color: lightgray; }

/* Seletor descendente */
div p { color: red; }   /* todos os p dentro de div */

/* Seletor filho direto */
div > p { font-weight: bold; } /* todos os p filhos diretos de div */

/* Seletor de irmãos */
h1 + p { color: gray; }     /* p logo após h1 */
h1 ~ p { color: darkgray; } /* todos os p após h1 */

/* Seletor de atributo */
input[type="text"] { border: 1px solid black; }

/* Seletor universal */
* { box-sizing: border-box; }

/* Pseudo-classes */
a:hover { color: red; }     /* quando passa o rato */
li:first-child { font-weight: bold; }

/* Pseudo-elementos */
p::first-line { text-transform: uppercase; }
```

### 🎨 Cores e Backgrounds

```css
/* Cor do texto */
color: red;             /* cor nomeada */
color: #ff0000;         /* hexadecimal */
color: rgb(255, 0, 0);  /* RGB */
color: hsl(0, 100%, 50%); /* HSL */

/* Fundo */
background-color: blue;
background-image: url("imagem.png");
background: linear-gradient(to right, green, blue);
```

***

### 🔠 Tipografia

```css
/* Tamanho e peso */
font-size: 16px;       /* px, em, rem, % */
font-weight: bold;     /* normal, bold, bolder, lighter, 100–900 */

/* Estilo e alinhamento */
font-style: italic;    
text-align: center;    /* left, right, justify */
text-transform: uppercase;  /* capitalize, lowercase */

/* Decoração */
text-decoration: underline; /* line-through, none */
```

***

### 📐 Espaçamento

```css
/* Margens */
margin: 10px;        /* todos os lados */
margin: 10px 20px;   /* vertical | horizontal */
margin: 5px 10px 15px 20px; /* top | right | bottom | left */

/* Padding */
padding: 10px;       
padding: 10px 20px;

/* Gap para grid/flex */
gap: 20px;
```

***

### 📦 **Flexbox**

```css
/* Display e posição */
display: block;        /* inline, inline-block, flex, grid, none */
position: relative;    /* absolute, fixed, sticky */

/* Flex */
display: flex;
flex-direction: row;      /* row, column */
justify-content: center;  /* flex-start, flex-end, center, space-between */
align-items: center;      /* flex-start, flex-end, center, stretch */
```

***

### 🧱 **Grid Layout**

```css
/* Estrutura básica */
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 10px;

/* Layout com áreas nomeadas */
.container {
  display: grid;
  grid-template-columns: 200px 1fr;   /* coluna lateral + conteúdo */
  grid-template-rows: 80px 1fr 60px;  /* cabeçalho + conteúdo + rodapé */
  grid-template-areas:
    "header header"
    "nav main"
    "footer footer";
  gap: 10px;
}

/* Associação das áreas */
header { grid-area: header; }
nav { grid-area: nav; }
main { grid-area: main; }
footer { grid-area: footer; }
```

📄 **HTML correspondente**

```html
<div class="container">
  <header>Header</header>
  <nav>Menu</nav>
  <main>Conteúdo principal</main>
  <footer>Rodapé</footer>
</div>
```

***

### 🎛️ Bordas e Radius

```css
/* Espessura e cor */
border: 1px solid black;
border-top: 2px dashed red;

/* Arredondamento */
border-radius: 4px;    /* px ou % */
border-radius: 50%;    /* círculo */
```

***

### ✨ Sombras e Efeitos

```css
/* Sombra */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

/* Opacidade */
opacity: 0.5;          /* 0 → transparente, 1 → opaco */

/* Transições e hover */
transition: all 0.3s ease-in-out;
div:hover { background-color: blue; }

/* Overflow e cursor */
overflow: hidden;      /* auto, scroll, visible */
cursor: pointer;       /* default, not-allowed */
```

***

### 📱 Responsividade

```css
/* Breakpoints */
@media (min-width: 768px) {
  body { font-size: 18px; }
}

/* Exemplo prático */
@media (max-width: 600px) {
  .menu { display: none; }
}
```