export default {
  iniciarPagina: async () => {
    // Validamos al usuario contra el módulo global
    const tienePermiso = await SeguridadGlobal.validarSocio();

    // Si no tiene permiso, lo enviamos fuera y detenemos el script
    if (!tienePermiso) {
      navigateTo('AccesoDenegado');
      return; 
    }

    // Si el script llega hasta aquí, el usuario ESTÁ autorizado.
    // Ejecutamos las consultas manuales de esta página específica.
    //await get_pedidos_historicos.run(); vamos a dejar esto pendiente para una implementación más detallada
    // await otra_consulta.run();
  }
}
