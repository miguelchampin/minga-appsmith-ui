export default {
  obtenerCiclo: async () => {
		// Dentro de tu flujo de inicio al cargar la página:
		const ciclo = await get_ciclo_actual.run();
		if (ciclo && ciclo.length > 0) {
  		storeValue('ciclo_id', ciclo[0].id);
		} else {
  		showAlert('No hay ningún ciclo de compra abierto en este momento.', 'warning');
		}
  }
}
