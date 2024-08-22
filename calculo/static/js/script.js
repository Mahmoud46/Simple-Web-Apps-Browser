let proc_res = document.getElementById("pro_res"),
	proc_steps = document.getElementById("pro_steps");

let pro_values = "",
	pro_symbols = "",
	lst_ele = "";

document.querySelectorAll(".btns button").forEach((btn) => {
	btn.addEventListener("click", (_) => {
		if (btn.getAttribute("value") == "AC") {
			pro_values = "";
			pro_symbols = "";
			proc_steps.value = "0";
			proc_res.value = 0;
		} else if (btn.getAttribute("value") == "BS") {
			if (
				[" % ", " ÷ ", " × ", " + ", " - "].includes(lst_ele) ||
				[" % ", " ÷ ", " × ", " + ", " - "].includes(pro_symbols.slice(-3))
			)
				pro_symbols = pro_symbols.slice(0, -3);
			else pro_symbols = pro_symbols.slice(0, -1);
			pro_values = pro_values.slice(0, -1);

			proc_steps.value = pro_symbols;
		} else if (btn.getAttribute("value") == "=") {
			proc_res.value = eval(pro_values);
		} else {
			if (
				![" % ", " ÷ ", " × ", " + ", " - "].includes(lst_ele) &&
				![" % ", " ÷ ", " × ", " + ", " - "].includes(
					btn.getAttribute("value")
				) &&
				pro_values != ""
			) {
				lst_ele = btn.getAttribute("sym");
				pro_values += btn.getAttribute("value");
				pro_symbols += btn.getAttribute("sym");

				proc_steps.value = pro_symbols;
			} else if (
				["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(
					btn.getAttribute("value")
				)
			) {
				lst_ele = btn.getAttribute("sym");
				pro_values += btn.getAttribute("value");
				pro_symbols += btn.getAttribute("sym");

				proc_steps.value = pro_symbols;
			}
		}
	});
});
