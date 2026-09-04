exports.seed = async function(knex) {
	// Limpa as tabelas antes de popular
	await knex('telemetria').del();
	await knex('veiculos').del();

	// Insere veículos de teste
	const [v1] = await knex('veiculos').insert({ placa: 'VOL1010', montadora: 'Volvo', modelo: 'FH 540' });
	const [v2] = await knex('veiculos').insert({ placa: 'SCA2020', montadora: 'Scania', modelo: 'R500' });

	// Insere Leituras iniciais de Telemetria
	await knex('telemetria').insert([
		{ veiculo_id: v1, velocidade: 80.0, temperatura_motor: 88.5 },
		{ veiculo_id: v1, velocidade: 85.2, temperatura_motor: 90.1 },
		{ veiculo_id: v2, velocidade: 92.0, temperatura_motor: 94.8 }
	]);
};
