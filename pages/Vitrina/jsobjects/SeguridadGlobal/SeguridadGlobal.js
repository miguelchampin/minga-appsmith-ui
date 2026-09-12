export default {
  validarSocio: async () => {
    try {
      // Si el ID ya está en memoria, no necesitamos ir a la base de datos de nuevo
      if (appsmith.store.Socio_id) {
        return true;
      }

      // Si no está en memoria, buscamos el correo en Postgres
      const socio = await get_socio_actual.run();
      
      if (socio && socio.length > 0) {
        // Guardamos el ID y confirmamos
        storeValue('socio_id', socio[0].id);
        return true; 
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error validando:", error);
      return false; // Ante cualquier duda, bloqueamos
    }
  }
}