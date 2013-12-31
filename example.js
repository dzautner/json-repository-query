var ChristmasList = Repository([

	{
		name: "Daniel",
		age: 12,
		wants: "a dog",
	},


	{
		name: "Julia",
		age: 8,
		wants: "a bottle of rum"
	},


	{
		name: "Vitaly",
		age: Infinity,
		wants: "a dog"
	},

	{
		name: "Ina",
		age: 20,
		wants: "Vitaly"
	}
]);


ChristmasList.wants['a dog'].get; // [ {age: 12, name: "Daniel",wants: "a dog"}, {age: Infinity, name: "Vitaly", wants: "a dog"} ]
ChristmasList.age['<']['12'].get; // {name: "Julia", age: 8, wants: "a bottle of rum"}
ChristmasList.wants['a dog'].age[">"]["12"].get; // {name: "Vitaly", age: Infinity, wants: "a dog"};
ChristmasList.wants[
	ChristmasList.wants['a dog'].age[">"]["12"].get.name
].get // {name: "Ina", age: 20, wants: "Vitaly"}
