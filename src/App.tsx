import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level } from './helpers/imc'
import { GridItem } from './components/GridItem';
import  leftArrowImage  from './assets/leftarrow.png'

const App = () => {


	// UseStates
	const [heightField, setHeightField] = useState<number>(0);
	const [weightField, setWeightField] = useState<number>(0);
	const [toShow, setToShow] = useState<Level | null>(null);

	// Functions
	const handleCalculateButton = () => {
		if ( heightField && weightField) {
			setToShow(calculateImc(heightField, weightField));
		} else {
			alert ('Digite todos os campos!');
		}
	}

	const handleBackButton = () => {
		setHeightField(0);
		setWeightField(0);
		setToShow(null);
	}

	return (

		<div className={styles.main}>
			<header>
				<div className={styles.headerContainer}>
					<img src={poweredImage} alt="" width={150}/>
				</div>
			</header>

			<div className={styles.container}>
				<div className={styles.leftside}>
					<h1>Calcule o seu IMC</h1>
					<p>O índice de massa corporal é uma medida internacional usada para calcular se uma pessoa está no peso ideal</p>

					<input 
						type="number"
						placeholder='Digite a sua altura. Ex: 1.5 (Metros)'
						value={heightField > 0 ? heightField : ''} // Se o número for menor que 0, coloque nada, se for maior, coloque o valor dele;
						onChange={e => setHeightField(parseFloat(e.target.value))} // Value sempre é uma string, transformei em float para receber números decimais;
						disabled={toShow ? true : false}
					/>
					<input 
						type="number"
						placeholder='Digite o seu peso. Ex: 70.5 (Quilos)'
						value={weightField > 0 ? weightField : ''} // Se o número for menor que 0, coloque nada, se for maior, coloque o valor dele;
						onChange={e => setWeightField(parseFloat(e.target.value))} // Value sempre é uma string, transformei em float para receber números decimais;
						disabled={toShow ? true : false}
					/>

					<button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>

				</div>
				<div className={styles.rightside}>

					{!toShow &&
						<div className={styles.grid}>
							{levels.map((item, key) => (
								<GridItem key={key} item={item} />
							))}
						</div>
					}
					{toShow &&
						<div className={styles.rightBig}>
							<div className={styles.rightArrow} onClick={handleBackButton}>
								<img src={leftArrowImage} alt="" width={25}/>
							</div>
							<GridItem item={toShow}/>
						</div>
					}			
				</div>
			</div>



			<footer className={styles.footer}>
				<p>Feito por Rafael Alcantara</p>
			</footer>
		</div>	
	);
}

export default App; 

/*

*/