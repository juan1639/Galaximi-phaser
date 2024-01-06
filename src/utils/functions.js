
// ===============================================================================
function centrar_txt(texto, anchoScreen) {

    console.log(texto.width);
    return Math.floor(anchoScreen / 2 - texto.width / 2);
}

export { centrar_txt };
  