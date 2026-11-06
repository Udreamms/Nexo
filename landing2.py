# Landing v7: estética de plataforma de salud (calma, neutros cálidos, íconos de línea, DM Sans liviana).
# Sin fotos: espacios marcados "Foto pendiente" hasta recibir las nuevas.
import sys, os
OUT = sys.argv[1]

INK = '#1C1F3A'; TXT = '#4B4E63'; MUT = '#6E7085'; LINE = '#E4E0D8'; WARM = '#F6F4F0'; COOL = '#EEF0F4'; DARK = '#231A4D'; ACC = '#5B3FD9'
BTN = f"background: {DARK}; color: #FFFFFF; text-decoration: none; font-weight: 500; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px"
H2 = f"margin: 0; font-weight: 500; font-size: 36px; line-height: 1.15; letter-spacing: -0.02em; color: {INK}"
LINK = f"color: {INK}; font-weight: 500; font-size: 15px; text-decoration: none; border-bottom: 1px solid {INK}; padding-bottom: 2px; align-self: flex-start"
SW = "fill: none; stroke: currentColor; stroke-width: 1.6; stroke-linecap: round; stroke-linejoin: round"

P = {
 'shield': ['M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3z'],
 'users': ['M9 4.8a3.2 3.2 0 1 0 0 6.4a3.2 3.2 0 1 0 0-6.4z', 'M3.5 19c.8-3 3-4.6 5.5-4.6s4.7 1.6 5.5 4.6', 'M16 5.2a3 3 0 0 1 0 5.6', 'M17.5 14.6c1.6.5 2.7 2 3 4.4'],
 'clock': ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M12 7v5l3 2'],
 'heart': ['M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z'],
 'file': ['M7 3h7l4 4v14H7z', 'M14 3v4h4', 'M9.5 12h6', 'M9.5 15.5h6'],
 'chat': ['M5 5h14v10H10l-4 3.5V15H5z'],
 'check': ['M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z', 'M8.5 12.2l2.4 2.4 4.8-5'],
 'scale': ['M12 4v16', 'M7 20h10', 'M5 8h14', 'M5 8l-2.5 6h5z', 'M19 8l-2.5 6h5z'],
 'bell': ['M6 16v-5a6 6 0 0 1 12 0v5l1.5 2h-15z', 'M10 20.5a2 2 0 0 0 4 0'],
 'receipt': ['M6 3h12v18l-3-2-3 2-3-2-3 2z', 'M9 8h6', 'M9 12h6'],
 'arrow': ['M5 12h14', 'M13 6l6 6-6 6'],
 'image': ['M4 5h16v14H4z', 'M4 16l4.5-4.5 4 4 2.5-2.5 5 5', 'M15.5 8.5a1 1 0 1 0 0 2a1 1 0 1 0 0-2z'],
}
def ic(name, size=24):
    return f'<svg width="{size}" height="{size}" sc-camel-view-box="0 0 24 24" aria-hidden="true" style="{SW}; flex: 0 0 auto">' + ''.join(f'<path d="{d}"></path>' for d in P[name]) + '</svg>'
ARROW = ic('arrow', 18)
def ph(h, label='Foto pendiente', dark=False, radius='0', extra=''):
    bg = 'linear-gradient(135deg, #3A3268 0%, #6E63A3 100%)' if dark else 'linear-gradient(135deg, #ECE8E1 0%, #DDD6CA 100%)'
    col = 'rgba(255,255,255,0.55)' if dark else '#8C8477'
    return (f'<div class="nx-ph" style="position: relative; height: {h}; border-radius: {radius}; background: {bg}; color: {col}; {extra}">'
            f'<span style="position: absolute; right: 14px; bottom: 12px; display: flex; align-items: center; gap: 6px; font-size: 12.5px">{ic("image", 16)}{label}</span></div>')
LOGO = f'<span style="width: 32px; height: 32px; border-radius: 9px; background: {DARK}; color: #FFFFFF; font-weight: 700; font-size: 17px; display: flex; align-items: center; justify-content: center">N</span>'
WSP = """<svg width="26" height="26" sc-camel-view-box="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3 1 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3z"></path></svg>"""

def faq(q, a):
    return (f'<details style="border-bottom: 1px solid {LINE}; padding: 20px 0"><summary style="font-weight: 500; font-size: 17px; color: {INK}; cursor: pointer">{q}</summary>'
            f'<p style="margin: 10px 0 0; color: {TXT}; line-height: 1.6; font-size: 15.5px">{a}</p></details>')
faqs = ''.join(faq(q, a) for q, a in [
    ('¿Cuánto cuesta usar Nexo?', 'Nada. Comparar planes y recibir asesoría es gratis para ti.'),
    ('¿Por qué es gratis?', 'La Isapre le paga la comisión al agente que te asesora. Tu plan cuesta exactamente lo mismo que si fueras directo a la Isapre.'),
    ('¿Tengo que dejar mis datos para ver los planes?', 'No. Ves los planes y precios sin dejar nombre ni teléfono. Solo te pedimos tu WhatsApp si quieres recibir la comparación y que una asesora te ayude a elegir.'),
    ('¿Y si mi plan actual ya es bueno?', 'Te lo decimos. Si no te conviene cambiarte, no te vamos a insistir.'),
    ('¿El precio que veo es el final?', 'En UF es el mismo que cobra la Isapre. En pesos es aproximado porque depende de la UF del mes. Un agente registrado confirma la cotización oficial antes de firmar.'),
    ('¿Mi bebé paga plan?', 'Hasta antes de cumplir 2 años no paga factor, solo el GES. Con 2 años cumplidos paga factor 0,6 más el GES.'),
])

beneficios = [('shield', 'Las 7 Isapres abiertas', 'Comparadas en un solo lugar.'), ('users', 'Asesoría personalizada', 'Una persona real y sin costo.'),
              ('clock', 'Cotización en 60 segundos', '100% online, sin papeleo.'), ('heart', 'Te acompañamos siempre', 'Antes, durante y después.')]
benef_html = ''.join(f'<div style="flex: 1 1 230px; min-width: 0; display: flex; gap: 16px; align-items: flex-start; color: {INK}">{ic(i, 30)}<span style="display: flex; flex-direction: column; gap: 2px"><span style="font-size: 16px; font-weight: 500">{t}</span><span style="font-size: 14.5px; color: {MUT}">{d}</span></span></div>' for i, t, d in beneficios)

pasos = [('file', 'Cuéntanos quiénes son', 'Las edades de tu familia y, si quieres, tu sueldo.'), ('scale', 'Compara opciones', 'Ves tu 7% y los 3 planes que más te convienen.'),
         ('chat', 'Recibe asesoría', 'Una asesora registrada te ayuda a elegir por WhatsApp.'), ('check', 'Elige y cámbiate', 'Hacemos el trámite contigo, sin complicarte.')]
pasos_html = ''
for i, (icn, t, d) in enumerate(pasos):
    pasos_html += (f'<div style="flex: 1 1 200px; min-width: 0; display: flex; flex-direction: column; gap: 12px">'
                   f'<div style="display: flex; align-items: center; gap: 12px"><span style="width: 28px; height: 28px; border-radius: 50%; background: {DARK}; color: #FFFFFF; font-size: 13px; font-weight: 500; display: flex; align-items: center; justify-content: center">{i+1}</span>'
                   f'<span style="width: 60px; height: 60px; border-radius: 50%; background: #E9E3DA; color: {INK}; display: flex; align-items: center; justify-content: center">{ic(icn, 26)}</span></div>'
                   f'<span style="font-size: 17px; font-weight: 500; color: {INK}">{t}</span><span style="font-size: 14.5px; color: {MUT}; line-height: 1.55">{d}</span></div>')

oferta = [('scale', 'Comparación de las 7 Isapres con tu 7% real', 'En UF y en pesos, con lo que te sobra o te falta.'),
          ('users', 'Una asesora registrada que te ayuda a elegir', 'En simple y sin presión. Verificable en la Superintendencia de Salud.'),
          ('file', 'El trámite de cambio, contigo', 'Hacemos la cotización oficial y te acompañamos hasta firmar.'),
          ('bell', 'Aviso de alzas cada año', 'Te avisamos si tu plan sube y revisamos si te conviene cambiarte.'),
          ('receipt', 'Ayuda después de firmar', 'Reembolsos, licencias y dudas del día a día.')]
oferta_html = ''.join(f'<div style="display: flex; gap: 16px; align-items: flex-start; padding: 18px 0; border-bottom: 1px solid {LINE}; color: {INK}">{ic(i, 26)}<span style="display: flex; flex-direction: column; gap: 3px"><span style="font-size: 16.5px; font-weight: 500">{t}</span><span style="font-size: 14.5px; color: {MUT}">{d}</span></span></div>' for i, t, d in oferta)

isapres = ['Banmédica', 'Colmena', 'Consalud', 'Cruz Blanca', 'Esencial', 'Nueva Masvida', 'Vida Tres']
isap_html = ''.join(f'<span style="font-size: 16px; font-weight: 500; color: {TXT}; white-space: nowrap">{n}</span>' for n in isapres)

CH = 'font: inherit; font-size: 14.5px; border-radius: 12px; cursor: pointer'
cotizador = f'''<div id="cotizar" style="display: flex; flex-direction: column; gap: 18px">
<div style="display: flex; flex-direction: column; gap: 4px"><span style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; color: {ACC}">COTIZA EN 60 SEGUNDOS</span><span style="font-size: 24px; font-weight: 500; color: {INK}; letter-spacing: -0.01em">¿A quién quieres proteger?</span></div>
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px"><sc-for list="{{{{grupos}}}}" as="g"><button type="button" onclick="{{{{g.on}}}}" style="{CH}; font-weight: 500; padding: 12px 14px; text-align: left; {{{{g.estilo}}}}">{{{{g.t}}}}</button></sc-for></div>
<div style="display: flex; flex-direction: column; gap: 8px"><span style="font-size: 14px; font-weight: 500; color: {INK}">Edades</span>
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
<label style="display: flex; align-items: center; gap: 6px; background: #FFFFFF; border: 1px solid #DCD8D0; border-radius: 12px; padding: 5px 6px 5px 12px; font-size: 14px; color: {TXT}">Tú<input type="number" min="18" max="110" inputmode="numeric" value="{{{{edad}}}}" onchange="{{{{onEdad}}}}" aria-label="Tu edad" style="font: inherit; font-size: 15px; font-weight: 500; color: {INK}; width: 50px; padding: 6px; border: 0; background: {WARM}; border-radius: 8px; text-align: center"></label>
<sc-for list="{{{{personas}}}}" as="p"><label style="display: flex; align-items: center; gap: 6px; background: #FFFFFF; border: 1px solid #DCD8D0; border-radius: 12px; padding: 5px 4px 5px 12px; font-size: 14px; color: {TXT}">{{{{p.t}}}}<input type="number" min="0" max="110" inputmode="numeric" value="{{{{p.edad}}}}" onchange="{{{{p.onEdad}}}}" aria-label="{{{{p.aria}}}}" style="font: inherit; font-size: 15px; font-weight: 500; color: {INK}; width: 50px; padding: 6px; border: 0; background: {WARM}; border-radius: 8px; text-align: center"><button type="button" onclick="{{{{p.onQuitar}}}}" aria-label="Quitar" style="font: inherit; border: 0; background: none; color: {MUT}; cursor: pointer; font-size: 16px; padding: 0 6px">×</button></label></sc-for>
<button type="button" onclick="{{{{onHijo}}}}" style="{CH}; color: {ACC}; background: none; border: 1px dashed #BDB3E6; padding: 10px 12px">+ Hijo/a</button>
<sc-if value="{{{{!hayPareja}}}}"><button type="button" onclick="{{{{onPareja}}}}" style="{CH}; color: {ACC}; background: none; border: 1px dashed #BDB3E6; padding: 10px 12px">+ Pareja</button></sc-if>
</div></div>
<label style="display: flex; flex-direction: column; gap: 8px; font-size: 14px; font-weight: 500; color: {INK}">Tu sueldo líquido <span style="font-weight: 400; color: {MUT}">(opcional, para calcular tu 7%)</span>
<span style="display: flex; align-items: center; background: #FFFFFF; border: 1px solid #DCD8D0; border-radius: 12px; padding: 0 12px"><span style="color: {MUT}">$</span><input inputmode="numeric" value="{{{{renta}}}}" onchange="{{{{onRenta}}}}" placeholder="Ej: 1.200.000" aria-label="Tu sueldo líquido" style="flex: 1 1 auto; min-width: 0; font: inherit; font-size: 17px; font-weight: 500; color: {INK}; padding: 12px 8px; border: 0; outline: none; background: transparent"></span></label>
<div style="display: grid; grid-template-columns: 1fr 1fr; background: #FFFFFF; border: 1px solid {LINE}; border-radius: 14px">
<div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 2px; border-right: 1px solid {LINE}"><span style="font-size: 12.5px; color: {MUT}">Tu 7% al mes</span><span style="font-size: 19px; font-weight: 500; color: {INK}">{{{{siete}}}}</span></div>
<div style="padding: 12px 14px; display: flex; flex-direction: column; gap: 2px"><span style="font-size: 12.5px; color: {MUT}">Planes desde · {{{{nTxt}}}}</span><span style="font-size: 19px; font-weight: 500; color: {INK}">{{{{desdeUf}}}}</span><span style="font-size: 12px; color: {MUT}">aprox. {{{{desdeClp}}}} al mes</span></div>
</div>
<a href="{{{{url}}}}" class="nx-cta" style="{BTN}; justify-content: center; font-size: 17px; padding: 17px 22px">Ver mis 3 mejores planes {ARROW}</a>
<span style="font-size: 12.5px; color: {MUT}; text-align: center">Gratis · Sin dejar tus datos · Ninguna Isapre paga por aparecer primero</span>
</div>'''

body = f'''
<div style="width: 100%; background: #FFFFFF; color: {INK}; font-family: 'DM Sans', system-ui, sans-serif">

<header style="position: relative; z-index: 2; background: #FFFFFF; border-bottom: 1px solid {LINE}">
<div style="max-width: 1280px; margin: 0 auto; padding: 16px 28px; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px">
<a href="#inicio" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: {INK}">{LOGO}<span style="font-weight: 700; font-size: 22px; letter-spacing: -0.02em">nexo</span><span style="font-size: 14px; color: {MUT}; font-weight: 400">salud</span></a>
<nav aria-label="Principal" style="display: flex; flex-wrap: wrap; gap: 30px; font-size: 15px">
<a href="#etapas" style="color: {TXT}; text-decoration: none">Planes</a>
<a href="#como" style="color: {TXT}; text-decoration: none">Cómo funciona</a>
<a href="#preguntas" style="color: {TXT}; text-decoration: none">Preguntas</a>
<a href="Aprende.dc.html" style="color: {TXT}; text-decoration: none">Aprende</a>
</nav>
<a href="#cotizar" style="{BTN}; font-size: 15px; padding: 11px 20px">Cotiza tu Isapre {ARROW}</a>
</div>
</header>

<section id="inicio" aria-label="Inicio" style="background: {WARM}">
<div class="nx-hero" style="display: flex; flex-wrap: wrap; align-items: stretch">
<div class="nx-hero-foto" style="flex: 1 1 560px; min-width: 0; position: relative; min-height: 640px; overflow: hidden">
{ph('100%', 'Foto del banner (pendiente)', dark=True, extra='position: absolute; inset: 0')}
<div class="nx-hero-txt" style="position: relative; max-width: 560px; padding: 120px 56px 56px; display: flex; flex-direction: column; gap: 18px; color: #FFFFFF">
<h1 style="margin: 0; font-weight: 500; font-size: clamp(40px, 4.4vw, 62px); line-height: 1.06; letter-spacing: -0.03em">Tu salud,<br>nuestra prioridad.</h1>
<p style="margin: 0; font-size: 19px; line-height: 1.55; color: rgba(255,255,255,0.92)">Compara, cotiza y elige el plan de Isapre que mejor se adapta a ti y a tu familia, con una asesora que te acompaña.</p>
</div>
</div>
<div class="nx-hero-form" style="flex: 0 1 500px; min-width: 0; background: {WARM}; padding: 44px 44px 40px">{cotizador}</div>
</div>
</section>

<section aria-label="Beneficios" style="background: #FFFFFF; border-bottom: 1px solid {LINE}">
<div style="max-width: 1280px; margin: 0 auto; padding: 40px 28px; display: flex; flex-wrap: wrap; gap: 28px">{benef_html}</div>
</section>

<section id="etapas" aria-label="Planes para cada etapa" style="background: #FFFFFF">
<div style="max-width: 1280px; margin: 0 auto; padding: 88px 28px; display: flex; flex-wrap: wrap; gap: 40px; align-items: flex-start">
<div style="flex: 1 1 260px; min-width: 0; display: flex; flex-direction: column; gap: 16px; padding-top: 24px">
<h2 style="{H2}">Planes para cada etapa de tu vida</h2>
<p style="margin: 0; font-size: 16.5px; line-height: 1.6; color: {TXT}">Elige tu caso y te mostramos los planes que calzan contigo y con tu familia.</p>
<a href="#cotizar" style="{LINK}">Cotizar ahora →</a>
</div>
<div style="flex: 999 1 720px; min-width: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px">
<sc-for list="{{{{etapas}}}}" as="e"><button type="button" onclick="{{{{e.on}}}}" class="nx-etapa" style="font: inherit; text-align: left; background: none; border: 0; padding: 0; cursor: pointer; display: flex; flex-direction: column; gap: 10px; color: {INK}">{ph('190px', radius='16px', extra='width: 100%')}<span style="font-size: 16.5px; font-weight: 500">{{{{e.t}}}}</span><span style="font-size: 14px; color: {MUT}; margin-top: -6px">{{{{e.d}}}}</span></button></sc-for>
</div>
</div>
</section>

<section id="como" aria-label="Cómo funciona" style="background: {COOL}">
<div style="max-width: 1280px; margin: 0 auto; padding: 88px 28px; display: flex; flex-wrap: wrap; gap: 48px; align-items: flex-start">
<div style="flex: 1 1 260px; min-width: 0; display: flex; flex-direction: column; gap: 16px">
<h2 style="{H2}">Es muy fácil cotizar tu Isapre</h2>
<p style="margin: 0; font-size: 16.5px; line-height: 1.6; color: {TXT}">En 4 pasos tienes tu cotización personalizada, gratis y sin compromiso.</p>
<a href="#cotizar" style="{LINK}">Empezar ahora →</a>
</div>
<div style="flex: 999 1 760px; min-width: 0; display: flex; flex-wrap: wrap; gap: 32px">{pasos_html}</div>
</div>
</section>

<section aria-label="Por qué Nexo" style="background: #FFFFFF">
<div style="max-width: 1280px; margin: 0 auto; padding: 88px 28px; display: flex; flex-wrap: wrap; gap: 56px; align-items: center">
<div style="flex: 1 1 420px; min-width: 0">{ph('520px', radius='24px')}</div>
<div style="flex: 1 1 480px; min-width: 0; display: flex; flex-direction: column; gap: 14px">
<span style="font-size: 13px; font-weight: 500; letter-spacing: 0.08em; color: {ACC}">POR QUÉ NEXO</span>
<h2 style="{H2}">No es un comparador más: es una persona que te acompaña.</h2>
<p style="margin: 0; font-size: 16.5px; line-height: 1.6; color: {TXT}">Todo esto es gratis para ti, porque la comisión del agente la paga la Isapre. Tu plan cuesta lo mismo que si fueras directo.</p>
<div style="display: flex; flex-direction: column">{oferta_html}</div>
<span style="font-size: 15.5px; font-weight: 500; color: {ACC}; padding-top: 8px">Y si tu plan actual ya es el mejor para ti, te lo decimos.</span>
</div>
</div>
</section>

<section aria-label="Isapres" style="background: {WARM}">
<div style="max-width: 1280px; margin: 0 auto; padding: 64px 28px; display: flex; flex-direction: column; gap: 24px; align-items: center; text-align: center">
<span style="font-size: 22px; font-weight: 500; color: {INK}">Las 7 Isapres abiertas, en un solo lugar</span>
<div style="background: #FFFFFF; border-radius: 16px; padding: 22px 32px; display: flex; flex-wrap: wrap; gap: 18px 40px; justify-content: center; box-shadow: 0 1px 2px rgba(28,31,58,0.06)">{isap_html}</div>
</div>
</section>

<section id="preguntas" aria-label="Preguntas frecuentes" style="background: #FFFFFF">
<div style="max-width: 1280px; margin: 0 auto; padding: 88px 28px; display: flex; flex-wrap: wrap; gap: 48px">
<div style="flex: 1 1 260px; min-width: 0; display: flex; flex-direction: column; gap: 16px"><h2 style="{H2}">Preguntas frecuentes</h2><p style="margin: 0; font-size: 16.5px; line-height: 1.6; color: {TXT}">¿Quieres aprender más? Revisa nuestras guías en simple.</p><a href="Aprende.dc.html" style="{LINK}">Ir a Aprende →</a></div>
<div style="flex: 999 1 640px; min-width: 0; border-top: 1px solid {LINE}">{faqs}</div>
</div>
</section>

<section aria-label="Cotiza ahora" style="background: #FFFFFF">
<div style="max-width: 1280px; margin: 0 auto; padding: 0 28px 88px">
<div style="position: relative; overflow: hidden; border-radius: 24px; min-height: 340px; display: flex; align-items: center">
{ph('100%', 'Foto de cierre (pendiente)', dark=True, extra='position: absolute; inset: 0')}
<div style="position: relative; padding: 56px; display: flex; flex-direction: column; gap: 18px; color: #FFFFFF; max-width: 620px">
<h2 style="margin: 0; font-weight: 500; font-size: 42px; line-height: 1.1; letter-spacing: -0.02em">Más salud, más tranquilidad.</h2>
<span style="font-size: 18px; color: rgba(255,255,255,0.9)">Descubre en 60 segundos cuánto te alcanza con tu 7%.</span>
<a href="#cotizar" style="background: #FFFFFF; color: {DARK}; text-decoration: none; font-weight: 500; border-radius: 999px; display: inline-flex; align-items: center; gap: 10px; align-self: flex-start; font-size: 16px; padding: 15px 24px">Cotiza tu Isapre {ARROW}</a>
</div>
</div>
</div>
</section>

<footer style="background: {WARM}; border-top: 1px solid {LINE}">
<div style="max-width: 1280px; margin: 0 auto; padding: 56px 28px 32px; display: flex; flex-direction: column; gap: 32px">
<div style="display: flex; flex-wrap: wrap; gap: 32px">
<div style="flex: 2 1 280px; display: flex; flex-direction: column; gap: 12px"><div style="display: flex; align-items: center; gap: 10px">{LOGO}<span style="font-weight: 700; font-size: 21px">nexo</span><span style="font-size: 14px; color: {MUT}">salud</span></div><span style="font-size: 15px; line-height: 1.5; color: {TXT}">Comparamos, explicamos y te conectamos con un agente registrado.</span></div>
<div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 10px; font-size: 15px"><strong style="font-weight: 500">Herramientas</strong><a href="#cotizar" style="color: {TXT}">Cotiza tu Isapre</a><a href="Revisa.dc.html" style="color: {TXT}">Revisa tu plan</a></div>
<div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 10px; font-size: 15px"><strong style="font-weight: 500">Aprende</strong><a href="Aprende.dc.html" style="color: {TXT}">Guías y glosario</a><a href="Aprende.dc.html#certificado" style="color: {TXT}">Certificado AFP</a></div>
<div style="flex: 1 1 160px; display: flex; flex-direction: column; gap: 10px; font-size: 15px"><strong style="font-weight: 500">Nexo</strong><a href="#inicio" style="color: {TXT}">Quiénes somos</a><a href="NexoPro.dc.html" style="color: {TXT}">Para agentes</a><a href="#inicio" style="color: {TXT}">Privacidad</a></div>
</div>
<p style="margin: 0; border-top: 1px solid {LINE}; padding-top: 22px; font-size: 13px; line-height: 1.6; color: {MUT}">Nexo entrega información general y comparaciones referenciales. La asesoría, la cotización oficial y la firma del contrato las realiza un agente de ventas registrado en la Superintendencia de Salud. Tus datos se comparten solo con tu autorización.</p>
</div>
</footer>

<a href="#cotizar" aria-label="Escríbenos por WhatsApp" style="position: fixed; right: 22px; bottom: 22px; z-index: 5; width: 56px; height: 56px; border-radius: 50%; background: #1FA855; color: #FFFFFF; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 22px rgba(0,0,0,0.18)">{WSP}</a>
</div>
'''
open(os.path.join(OUT, '02-inicio.body.html'), 'w', encoding='utf8').write(body)

css = '''
html { scroll-behavior: smooth; }
.nx-cta { transition: transform .2s, box-shadow .2s, background .2s; box-shadow: 0 8px 22px rgba(35,26,77,0.22); }
.nx-cta:hover { transform: translateY(-1px); background: #34287A !important; }
.nx-etapa .nx-ph { transition: transform .25s, box-shadow .25s; }
.nx-etapa:hover .nx-ph { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(28,31,58,0.12); }
input:focus, button:focus-visible, a:focus-visible, summary:focus-visible { outline: 2px solid #5B3FD9; outline-offset: 2px; }
details summary { list-style: none; } details summary::-webkit-details-marker { display: none; }
details summary::after { content: '+'; float: right; font-weight: 400; color: #6E7085; font-size: 22px; line-height: 1; }
details[open] summary::after { content: '–'; }
@media (max-width: 1060px) { .nx-hero-form { flex: 1 1 100% !important } .nx-hero-foto { min-height: 440px !important } .nx-hero-txt { padding: 80px 32px 40px !important } }
@media (max-width: 700px) { header nav { display: none !important } .nx-hero-foto { min-height: 340px !important } .nx-hero-txt { padding: 56px 20px 28px !important } .nx-hero-form { padding: 28px 16px !important } h2 { font-size: 28px !important } }
'''
open(os.path.join(OUT, '02-inicio.head.css'), 'w', encoding='utf8').write(css)
print('landing v7 ok')
