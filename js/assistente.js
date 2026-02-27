document.addEventListener('DOMContentLoaded', function() {
    const assistantAvatar = document.getElementById('assistantAvatar');
    const chatBox = document.getElementById('chatBox');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const quickButtons = document.querySelectorAll('.quick-btn');

    // Informações do Senac
    const INFO_SENAC = {
        curso: "Técnico em Desenvolvimento de Sistemas",
        duracao: "18 meses (3 semestres)",
        prerequisitos: "Ensino Médio completo",
        investimento: "R$ 497,00/mês",
        localizacao: "Rua Dr. Mário Machado De Lemos, 240 - Jardim Londrina, Dourados/MS",
        whatsapp: "5567999492638",
        telefone: "6734112400",
        email: "atendimento@ms.senac.br",
        site: "https://www.ms.senac.br"
    };

    // Respostas personalizadas
    const respostas = {
        'Quero informações sobre o curso': `
            📚 <strong>Curso Técnico em Desenvolvimento de Sistemas</strong><br><br>
            ⏱️ Duração: 18 meses (3 semestres)<br>
            💰 Investimento: R$ 497,00/mês<br>
            🕐 Horários: Manhã (8h-12h), Tarde (13h-17h), Noite (19h-22h00)<br><br>
            📍 Local: Senac Dourados - Rua Dr. Mário Machado De Lemos, 240, Jardim Londrina
        `,

        'Próximos eventos': `
            🚀 <strong>Próximos Eventos:</strong><br><br>
            • <strong>Palestra Carreiras em TI</strong> - 10/04, 19h30<br>
            • <strong>🚀 Maratona Desenvolvedor</strong> - 25/05, 8h às 20h<br>
            • <strong>💻 Hackathon DS 2026</strong> - 10 a 12/06<br>
            • <strong>Workshop React Native</strong> - 20/06, 14h<br><br>
            <a href="eventos.html" style="color: white;">Ver todos →</a>
        `,

        'Projeto SAMU': `
            🏥 <strong>Projeto Integrador - SAMU Dourados</strong><br><br>
            Sistema de Gerenciamento de Estoque e Insumos sendo desenvolvido pelos alunosda turma 254.<br><br>
            ✅ Controle em tempo real de medicamentos<br>
            ✅ Gestão de validade e lotes<br>
            ✅ App mobile para equipes de campo<br>
            ✅ Redução de 30% nas perdas<br><br>
            Projeto destaque 2026! 🏆
        `,

        'Maratona Desenvolvedor': `
            🚀 <strong>Maratona Desenvolvedor 2026</strong><br><br>
            📅 Data: 25 de Maio<br>
            ⏰ Horário: 8h às 20h<br>
            📍 Local: Laboratórios Senac Dourados<br><br>
            🔥 12 horas de desafios de programação<br>
            🏆 Prêmios para os melhores times<br><br><br>
            <button onclick="alert('Inscrições pelo site do Senac')" style="background: white; color: #4CAF50; border: none; padding: 5px 15px; border-radius: 20px; cursor: pointer;">Inscrever-se</button>
        `,

        'Hackathon DS': `
            💻 <strong>Hackathon DS 2026</strong><br><br>
            📅 Data: 10 a 12 de Junho<br>
            ⏰ Início: 8h (10/06) - Término: 18h (12/06)<br>
            📍 Local: Senac Dourados<br><br>
            🎯 Desafio: Soluções para saúde pública<br>
            👥 Times de até 5 pessoas<br>
            💰 Premiação: a ser decidido <br><br>
            Em breve mais informações!
        `,

        'Palestras': `
            🎤 <strong>Próximas Palestras:</strong><br><br>
            • <strong>10/04</strong> - ...<br><br>
            • <strong>15/05</strong> - ...<br><br>
            • <strong>05/06</strong> - ...<br><br>
            • <strong>20/06</strong> - ...<br><br>
        `,

        'Quero me inscrever': `
            📝 <strong>Processo de Inscrição</strong><br><br>
            Para se inscrever no curso:<br><br>
            1️⃣ Acesse: <strong>www.ms.senac.br</strong><br>
            2️⃣ Clique em "Cursos Técnicos"<br>
            3️⃣ Escolha "Desenvolvimento de Sistemas - Dourados"<br>
            4️⃣ Preencha o formulário<br><br>
            📱 Dúvidas? WhatsApp: (67) 99949-2638
        `,

        'Contato': `
            📞 <strong>Canais de Atendimento - Senac Dourados</strong><br><br>
            📱 <strong>WhatsApp:</strong> (67) 99949-2638<br>
            📞 <strong>Telefone:</strong> (67) 3411-2400<br>
            📧 <strong>Email:</strong> atendimento@ms.senac.br<br>
            💻 <strong>Site:</strong> www.ms.senac.br<br><br>
            🏢 <strong>Endereço:</strong><br>
            Rua Dr. Mário Machado De Lemos, 240 - Jardim Londrina, Dourados/MS<br><br>
            ⏰ Atendimento: Segunda a Sexta, 8h às 22h
        `,

        'default': `
            👋 Olá! Como posso ajudar?<br><br>
            Escolha uma opção:<br>
            • 📚 Sobre o curso<br>
            • 🚀 Eventos<br>
            • 🏥 Projeto SAMU<br>
            • 💻 Maratona Desenvolvedor<br>
            • ⚡ Hackathon DS<br>
            • 🎤 Palestras<br>
            • 📝 Inscrição<br>
            • 📞 Contato
        `
    };

    // Abrir chat
    assistantAvatar.addEventListener('click', function() {
        chatBox.classList.add('active');
    });

    // Fechar chat
    closeChat.addEventListener('click', function() {
        chatBox.classList.remove('active');
    });


    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.innerHTML = text;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }


    function showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot-message', 'typing');
        typingDiv.textContent = '...';
        typingDiv.id = 'typingIndicator';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function removeTyping() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }


    function responder(mensagem) {
        removeTyping();
        addMessage(mensagem, true);
        showTyping();

        setTimeout(() => {
            removeTyping();
            let resposta = respostas[mensagem] || respostas['default'];
            addMessage(resposta);
        }, 800);
    }


    quickButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mensagem = this.getAttribute('data-message');

            if (mensagem === 'Quero me inscrever') {
                window.open('https://www.ms.senac.br', '_blank');
                addMessage('Quero me inscrever', true);
                showTyping();
                setTimeout(() => {
                    removeTyping();
                    addMessage('Você será redirecionado para o site do Senac. Qualquer dúvida, estamos aqui!');
                }, 800);
            } else {
                responder(mensagem);
            }
        });
    });


    document.addEventListener('click', function(event) {
        if (!assistantAvatar.contains(event.target) && !chatBox.contains(event.target)) {
            chatBox.classList.remove('active');
        }
    });
});