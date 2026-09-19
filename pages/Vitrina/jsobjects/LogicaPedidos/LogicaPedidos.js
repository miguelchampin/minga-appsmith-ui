export default {
  agregarAlCarrito: async () => {
    try {
      let cabeceraId;
      const busqueda = await buscar_cabecera.run();
      
      if (busqueda && busqueda.length > 0) {
        cabeceraId = busqueda[0].id;
      } else {
        const nuevaCabecera = await crear_cabecera.run();
        cabeceraId = nuevaCabecera[0].id;
      }
      
      // Se inserta el producto en la base de datos
      await insertar_detalle.run({ cabecera_id: cabeceraId });
      
      // NUEVO: Refresca el widget del carrito en la pantalla
      await get_carrito_actual.run();
      
      showAlert('¡Producto agregado al pedido!', 'success');
    } catch (error) {
      showAlert('Hubo un error al agregar el producto', 'error');
      console.error(error);
    }
  }
}