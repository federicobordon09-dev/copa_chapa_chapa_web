export interface Driver {
  num: string;
  initials: string;
  name: string;
  pts: number;
  split: string;
  avatarGradient: string;
}

export const drivers: Driver[] = [
  { num: "01", initials: "DL", name: "Damian Ludueña", pts: 44, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#F5C400,#c9a000)" },
  { num: "02", initials: "FP", name: "Franco Perez", pts: 36, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#e84040,#a01c1c)" },
  { num: "03", initials: "SC", name: "Santino Casciano", pts: 35, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#4090e8,#1a5cb0)" },
  { num: "04", initials: "FG", name: "Fabian Gamero", pts: 34, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#e8a040,#a06010)" },
  { num: "05", initials: "JV", name: "Julian Varlas", pts: 32, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#9b59b6,#6c3483)" },
  { num: "06", initials: "AR", name: "Alejandro Rodriguez", pts: 25, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#27ae60,#1a7a40)" },
  { num: "07", initials: "BK", name: "Bruno Koller", pts: 25, split: "Split 2 Bs Aires", avatarGradient: "linear-gradient(135deg,#1abc9c,#0e8a70)" },
  { num: "08", initials: "MT", name: "Marcos Turri", pts: 23, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#e84087,#a01c55)" },
  { num: "35", initials: "BC", name: "Brian Campos", pts: 22, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#e8a040,#c97d10)" },
  { num: "09", initials: "AC", name: "Agustin Carreras", pts: 22, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#3498db,#1a6ea0)" },
  { num: "10", initials: "JG", name: "Joaquin Gutierrez", pts: 22, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#e8c240,#a08810)" },
  { num: "11", initials: "MV", name: "Matteo Viñas", pts: 20, split: "Split 2 Bs Aires", avatarGradient: "linear-gradient(135deg,#e86840,#a03010)" },
  { num: "12", initials: "BM", name: "Bernardo Morico", pts: 19, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#8e44ad,#5b2c6f)" },
  { num: "13", initials: "AR", name: "Agustin Rojas", pts: 18, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#16a085,#0d6655)" },
  { num: "14", initials: "ND", name: "Nacho Davin", pts: 17, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#2980b9,#1a5276)" },
  { num: "15", initials: "MP", name: "Matias Pacheco", pts: 16, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#c0392b,#922b21)" },
  { num: "16", initials: "FA", name: "Fernando Ali", pts: 15, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#f39c12,#a06000)" },
  { num: "17", initials: "AM", name: "Agustin Moles", pts: 15, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#1abc9c,#148f77)" },
  { num: "18", initials: "FG", name: "Franco Guerreros", pts: 14, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#7f8c8d,#515a5a)" },
  { num: "19", initials: "KL", name: "Kevin Lhuillier", pts: 13, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#9b59b6,#76448a)" },
  { num: "20", initials: "GA", name: "Gonzalo Alonso", pts: 13, split: "Split 2 Bs Aires", avatarGradient: "linear-gradient(135deg,#27ae60,#1e8449)" },
  { num: "21", initials: "UM", name: "Uriel Manzanelli", pts: 13, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#e74c3c,#c0392b)" },
  { num: "22", initials: "LF", name: "Lucio Focaccia", pts: 11, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#2c3e50,#1a252f)" },
  { num: "23", initials: "JS", name: "Juan Jose Sanchez", pts: 11, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#3498db,#2980b9)" },
  { num: "24", initials: "AC", name: "Agustin Chijanoski", pts: 11, split: "Split 2 Bs Aires", avatarGradient: "linear-gradient(135deg,#f1c40f,#d4ac00)" },
  { num: "25", initials: "AS", name: "Agustin Savone", pts: 10, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#e67e22,#ca6f1e)" },
  { num: "26", initials: "PA", name: "Patricio Aguerreche", pts: 9, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#1abc9c,#17a589)" },
  { num: "27", initials: "MC", name: "Matias Cayrus Riffel", pts: 9, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#8e44ad,#7d3c98)" },
  { num: "28", initials: "NV", name: "Nico Valero", pts: 8, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#2ecc71,#27ae60)" },
  { num: "29", initials: "LN", name: "Lucas Nin", pts: 7, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#c0392b,#a93226)" },
  { num: "30", initials: "JV", name: "Julian Valiñas", pts: 7, split: "Split 1 Comodoro", avatarGradient: "linear-gradient(135deg,#2980b9,#2471a3)" },
  { num: "31", initials: "EP", name: "Eric Priemer", pts: 5, split: "Split 2 Bs Aires", avatarGradient: "linear-gradient(135deg,#7f8c8d,#626567)" },
  { num: "32", initials: "SO", name: "Santiago Ortiz Ocampo", pts: 3, split: "Split 2 Bs Aires", avatarGradient: "linear-gradient(135deg,#e84040,#922b21)" },
  { num: "33", initials: "LS", name: "Luka Sanchez", pts: 3, split: "Split 2 Comodoro", avatarGradient: "linear-gradient(135deg,#1abc9c,#148f77)" },
  { num: "34", initials: "LM", name: "Lucas Morel", pts: 1, split: "Split 1 Bs Aires", avatarGradient: "linear-gradient(135deg,#aab7b8,#717d7e)" },
];

export const top3 = drivers.slice(0, 3);
