export default {
  agregarAlCarrito: async () => {
		
		const itemClickeado = List1.triggeredItem; 
		
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
			// 		primero revisamos si el producto ya está en este carrito
      const productoExistente = await buscar_producto_detalle.run({ 
        cabecera_id: cabeceraId, 
        producto_ciclo_id: itemClickeado.producto_ciclo_id 
      });
      
      if (productoExistente && productoExistente.length > 0) {
        // Si ya existe, actualizamos sumando 1
        await sumar_cantidad_detalle.run({ 
          detalle_id: productoExistente[0].id 
        });
      } else {
        // Si no existe, lo insertamos por primera vez
        await insertar_detalle.run({ 
          cabecera_id: cabeceraId,
          producto_ciclo_id: itemClickeado.producto_ciclo_id,
					nombre: itemClickeado.nombre,
					precio_ciclo: itemClickeado.precio_ciclo
        });
      }
      
      // Refresca el widget del carrito en la pantalla
      await get_carrito_actual.run();
      
      showAlert('¡Producto agregado al pedido!', 'success');
    } catch (error) {
      showAlert('Hubo un error al agregar el producto', 'error');
      console.error(error);
    }
  },
	
	eliminarProducto: async () => {
    // 1. Capturamos la tarjeta exacta del carrito que el usuario clickeó
    const itemAEliminar = List1.triggeredItem; 
    
    try {
      // 2. Ejecutamos el delete pasando el ID del detalle
      await eliminar_detalle.run({ 
        detalle_id: itemAEliminar.detalle_id 
      });
      
      // 3. Refrescamos el carrito para que el producto desaparezca de la pantalla
      await get_carrito_actual.run();
      showAlert('Producto eliminado del carrito', 'success');
      
    } catch (error) {
      showAlert('Error al intentar eliminar el producto', 'error');
      console.error(error);
    }
	},
	restarCantidad: async () => {

    const itemClickeado = ListaCarrito.triggeredItem; 
    
    try {
      //  Evaluamos la cantidad actual
      if (itemClickeado.cantidad_pedida > 1) {
        // Si hay 2 o más, simplemente restamos 1
        await restar_cantidad_detalle.run({
          detalle_id: itemClickeado.detalle_id 
        });
      } else {
        // Si hay 1, restar lo dejaría en 0. Mejor lo eliminamos de la base de datos.
        await eliminar_detalle.run({ 
          detalle_id: itemClickeado.detalle_id 
        });
        showAlert('Producto eliminado del pedido', 'info');
      }
      
      // 3. Refrescamos el carrito en pantalla
      await get_carrito_actual.run();
      
    } catch (error) {
      showAlert('Error al modificar la cantidad', 'error');
      console.error(error);
    }
  },
	
	sumarCantidad: async () => {
    // 1. Capturamos la tarjeta desde el CARRITO (ListCarrito)
    const itemClickeado = ListaCarrito.triggeredItem; 
    
    try {
      // 2. Reutilizamos tu query de actualización pasándole el ID correcto
      await sumar_cantidad_detalle.run({ 
        // Recuerda usar .id o .detalle_id según lo que descubriste en el paso anterior
        detalle_id: itemClickeado.detalle_id 
      });
      
      // 3. Refrescamos la pantalla para mostrar el nuevo número
      await get_carrito_actual.run();
      
    } catch (error) {
      showAlert('Error al sumar la cantidad', 'error');
      console.error(error);
    }
  }
}