def calcular_demonstrativo(valores: dict[str, float], prejuizo_acumulado: float = 0.0):
    receita = valores.get("receitas", 0) - valores.get("deducoes", 0)
    cmv = valores.get("cmv", 0)
    lucro_bruto = receita - cmv
    despesas = valores.get("despesas", 0)
    lucro_operacional = lucro_bruto - despesas
    adicoes = valores.get("adicoes", 0)
    exclusoes = valores.get("exclusoes", 0)
    base_lalur = lucro_operacional + adicoes - exclusoes

    prejuizo_compensado = min(prejuizo_acumulado, base_lalur * 0.30)
    base_calculo = base_lalur - prejuizo_compensado

    irpj = base_calculo * 0.15
    adicional = max(base_calculo - 20000, 0) * 0.10
    csll = base_calculo * 0.09

    lucro_liquido = lucro_operacional - irpj - adicional - csll

    return {
        "receita": receita,
        "cmv": cmv,
        "lucro_bruto": lucro_bruto,
        "despesas": despesas,
        "lucro_operacional": lucro_operacional,
        "base_lalur": base_lalur,
        "prejuizo_compensado": prejuizo_compensado,
        "base_calculo": base_calculo,
        "irpj": irpj,
        "adicional_ir": adicional,
        "csll": csll,
        "lucro_liquido": lucro_liquido,
    }
