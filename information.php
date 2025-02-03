<?php
include "functions_db.php";
$information=getAllinformation();
?>
<html>
	<head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
		<meta charset="utf-8"/>
		<title>
		Информация
		</title>
	</head>
	<body>
    <nav class="navbar">
        <div class="container navbar__container">
            <ul class="navbar__list">
                <li><a href="index.html#hero">Главная</a></li>
                <li><a href="index.html#history">История</a></li>
                <li><a href="index.html#skills">Навыки</a></li>
                <li><a href="index.html#artists">Исполнители</a></li>
                <li><a href="index.html#music">Музыка</a></li>
                <li><a href="index.html#games">Игры</a></li>
                <li><a href="index.html#contacts">Контакты</a></li>
            </ul>
            <div class="love">
                <input id="switch" type="checkbox">
                <label class="love-heart" for="switch">
                    <i class="left"></i>
                    <i class="right"></i>
                    <i class="bottom"></i>
                    <div class="round"></div>
                 </label>
             </div>
        </div>
    </nav>
    <div class="container">
    <table class="table table-striped">
    <thead><th>КодИнформации</th><th>ТипКонтакта</th><th>ДанныеКонтакта</th></thead>
    <?php
    for($i=0; $i<count($information); $i++){
        $id=$information[$i]["КодИнформации"];
        $typecontact=$information[$i]["ТипКонтакта"];
        $datacontact=$information[$i]["ДанныеКонтакта"];
        echo "<tr><td>$id</td><td>$typecontact</td><td>$datacontact</td></tr>";
    }
    ?>
    </table>
    </div>
    <footer class="footer-dark">
        <div class="container footer__container">
            <p>&copy; 2024 Харланович А.Э. <br>Все права защищены.</p>
        </div>
    </footer>
    <script>
        const themeSwitch = document.getElementById('switch');
        const body = document.body;

    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    }
    const loadTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light-theme') {
            body.classList.add('light-theme');
            themeSwitch.checked = true
        }
    }
    loadTheme();
        themeSwitch.addEventListener('change', () => {
           body.classList.toggle('light-theme');
           if (body.classList.contains('light-theme')) {
            saveTheme('light-theme');
           } else {
            saveTheme('dark-theme')
          }
        });
    </script>
</body>
</html>