/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
  // 'find':true,
  // 'findOne' : true,
  // 'test' : true

  // AtcController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // DcpController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // DcpfController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // DcsaController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // EnvasesController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },ExcipientesController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },FfarmaceuticaController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // FfarmaceuticasimpController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // LaboratorioController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // PactivosController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // PrescripcionController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // SitRegistroController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // UniContController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // },
  // VAdmonController: {
  //   'find': true,
  //   'findOne': true,
  //   '*': false
  // }

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }
};
