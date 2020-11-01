With PLANES as (SELECT distinct 
		CASE
			WHEN C1.cod_asignatura in (:p_asignatura) then C1.cod_asignatura 
			ELSE C1.cod_asig_composi
		END cod_asignatura, 
		CASE
			WHEN C1.cod_asignatura in (:p_asignatura)  then C1.desc_asignatura
			ELSE C1.desc_asig_composi
		END asignatura, C2.desc_prog_curricular, c2.cod_plan, C1.desc_tipol
	FROM W3SIADNA5.sia_vm_asig_malla C1 LEFT OUTER JOIN 
	W3SIADNA5.SIA_VM_EST_ASIGNATURAS C2 on C1.COD_PLAN = C2.COD_PLAN
		where 
			(cod_asignatura in(:p_asignatura) and TIP_ASIG in ('C', 'B', 'O', 'T')) 
			or (COD_ASIG_COMPOSI in(:p_asignatura) and TIP_ASIG_COMPOSI in ('C', 'B', 'O', 'T'))
),

APRO as (Select distinct C1.cod_plan, C1.id_asignatura, C1.asignatura, count(C1.nota_alf) aprobados, 
	C1.nota_alf from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1 
	where 
		tipo_linea = 'CURSADAS'
		and nota_alf = 'AP'
        and id_asignatura in (:p_asignatura)
		and TO_NUMBER(SUBSTR(C1.periodo, 1, 4))>= ((select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) 
		from w3siadna5.SIA_VM_EST_APERTURA )-10) 
		group by C1.id_asignatura, C1.asignatura, C1.cod_plan, C1.nota_alf
),

REPRO as (Select distinct C1.cod_plan, C1.id_asignatura, C1.asignatura, count(C1.nota_alf) reprobados, 
	C1.nota_alf from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1 
	where 
		tipo_linea = 'CURSADAS'
		and nota_alf = 'RE'
        and id_asignatura in (:p_asignatura)
		and TO_NUMBER(SUBSTR(C1.periodo, 1, 4))>= ((select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) from w3siadna5.SIA_VM_EST_APERTURA )-10) 
		group by C1.id_asignatura, C1.asignatura, C1.cod_plan, C1.nota_alf
),

MEDIANA as (Select distinct cod_plan, id_asignatura, MEDIAN(NUM_MATRICULAS) median_prim_insc, (MEDIAN(NUM_MATRICULAS) -1) median_INFE 
	    from W3SIADNA5.SIA_T_EST_ASIGNATURAS
		where tipo_linea =  'CURSADAS'
        and id_asignatura in (:p_asignatura)
		and numins = '1'
		and TO_NUMBER(SUBSTR(periodo, 1, 4))>= ((select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) from w3siadna5.SIA_VM_EST_APERTURA )-10)
		group by id_asignatura, cod_plan
), 

EST_INCRIP as (Select distinct cod_plan, id_asignatura, count(*) est_inscritos from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1
        where tipo_linea = 'CURSADAS'
        and id_asignatura in (:p_asignatura)
        and periodo in (Select anyaca from talu_anyacademic where flgatimat = 'S')
        group by cod_plan, id_asignatura
), 

ESTUDIANTES as (Select distinct est.cod_plan, est.IDG_RIU from W3SIADNA5.SIA_T_EST_ASIGNATURAS est 
        inner join W3SIADNA5.SIA_VM_EST_MATRICULADOS MAT 
            on est.idg_riu = mat.idg_riu and est.cod_plan = mat.cod_plan
        where est.idg_riu not in (
            Select idg_riu from W3SIADNA5.SIA_T_EST_ASIGNATURAS C3
            where C3.cod_facultad_andina in (:p_facultad) 
            and C3.id_asignatura in (:p_asignatura) 
            and C3.cod_plan = est.cod_plan
            and (C3.NOTA_ALFABETICA = 'APROBADA' or C3.NOTA_ALFABETICA = 'SIN CALIFICACIÓN')
        )
            and MAT.periodo  > '2017-1A'
            and est.tipo_linea = 'CURSADAS'
            and est.NOTA_ALF = 'AP'
            and MAT.num_matricula >= (
                Select (MEDIAN(NUM_MATRICULAS) -1) median_INFE from W3SIADNA5.SIA_T_EST_ASIGNATURAS
                where tipo_linea =  'CURSADAS'
                and numins = '1'
                and cod_plan = est.cod_plan
                and id_asignatura in (:p_asignatura)
                and TO_NUMBER(SUBSTR(periodo, 1, 4))>= (
                    (select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) from w3siadna5.SIA_VM_EST_APERTURA )-10
                )
            )
            and est.id_asignatura in (
                Select distinct C1.cod_asignatura_prerequisito from W3SIADNA5.sia_vm_asig_prerequisitos C1 
                inner join W3SIADNA5.SIA_VM_ASIGNATURAS C2
                on c1.cod_asignatura_prerequisito = c2.cod_asignatura
                WHERE C2.vigente = 'VIGENTE' 
                and C1.periodo = (Select anyaca from talu_anyacademic where flgatimat = 'S')
                and c1.cod_asignaura in (:p_asignatura)
                and c1.cod_plan = est.cod_plan
            )
        group by est.cod_plan, est.IDG_RIU
        having count(distinct id_asignatura) = (
            Select count(distinct C1.cod_asignatura_prerequisito) from W3SIADNA5.sia_vm_asig_prerequisitos C1 
            inner join W3SIADNA5.SIA_VM_ASIGNATURAS C2
            on c1.cod_asignatura_prerequisito = c2.cod_asignatura
            WHERE C2.vigente = 'VIGENTE' 
            and C1.periodo = (Select anyaca from talu_anyacademic where flgatimat = 'S')
            and c1.cod_asignaura in (:p_asignatura)
            and c1.cod_plan = est.cod_plan
        )
),

NOVISTO_NOAPRO_ASIG as (Select distinct est_asig.cod_plan, count(distinct est_asig.idg_riu) est_ap_todos_prerreq from W3SIADNA5.SIA_VM_EST_ASIGNATURAS est_asig
        inner join estudiantes
            on est_asig.idg_riu = estudiantes.idg_riu and est_asig.cod_plan = estudiantes.cod_plan
        where est_asig.idg_riu not in (Select distinct idg_riu from w3siadna5.SIA_VM_EST_BLOQUEOS where estado_actual = 'Bloqueado' and cod_plan = est_asig.cod_plan)
        group by est_asig.cod_plan
), 

ESTUDIA_MATR_MEDIAN as (Select distinct C1.cod_plan, num_matricula, count(C1.cod_plan) Num_estud_debajo_media from W3SIADNA5.SIA_VM_EST_MATRICULADOS C1
        inner join MEDIANA on
            C1.cod_plan = MEDIANA.cod_plan
        where periodo in (Select anyaca from talu_anyacademic where flgatimat = 'S')
        and num_matricula < (   case 
                                    when MEDIANA.median_INFE < 1 then 2
                                    else MEDIANA.median_INFE
                                end)
        group by C1.cod_plan, num_matricula, C1.periodo
), 

PRIM_MATRI as (Select distinct cod_plan, count(documento) Num_estud_primera_matricula from W3SIADNA5.SIA_VM_EST_MATRICULADOS C1
        where periodo in (Select TO_NUMBER(SUBSTR(anyaca, 1, 4) - 1)||SUBSTR(anyaca,5, 3) anyaca from talu_anyacademic where flgatimat = 'S')
        and num_matricula = '1'
        group by cod_plan
),

DEMANDA3 as (Select count(distinct C1.cod_asignatura_prerequisito) numero_prerequisitos, c1.cod_plan, c1.cod_asignaura from W3SIADNA5.sia_vm_asig_prerequisitos C1 
        right join W3SIADNA5.SIA_VM_ASIGNATURAS C2
            on c1.cod_asignatura_prerequisito = c2.cod_asignatura
        WHERE C2.vigente = 'VIGENTE' 
        and C1.periodo = (Select anyaca from talu_anyacademic where flgatimat = 'S')
        and c1.cod_asignaura in (:p_asignatura)
        group by cod_plan, cod_asignaura
),

ASIG_PRERE as (Select distinct C3.cod_plan, C1.cod_asignatura_prerequisito, C2.asignatura from W3SIADNA5.sia_vm_asig_prerequisitos C1 
        inner join W3SIADNA5.SIA_VM_ASIGNATURAS C2
            on c1.cod_asignatura_prerequisito = c2.cod_asignatura
        right join W3SIADNA5.SIA_VM_EST_ASIGNATURAS C3
            on C3.cod_plan = c1.cod_plan
        WHERE C2.vigente = 'VIGENTE' 
        and C1.periodo = (Select anyaca from talu_anyacademic where flgatimat = 'S')
        and C1.cod_asignaura in (:p_asignatura)
), 

FALTA_UN_PREREQ as (Select distinct VIENDO.cod_plan, VIENDO.id_asignatura, ASIG_PRERE.asignatura, count(VIENDO.IDG_RIU) est_sin_asig_falta_unprerre from W3SIADNA5.SIA_VM_EST_ASIGNATURAS VIENDO 
                inner join W3SIADNA5.SIA_VM_EST_ASIGNATURAS VIO
                    on VIENDO.idg_riu = VIO.idg_riu
                inner join ASIG_PRERE
                    on VIENDO.cod_plan = ASIG_PRERE.cod_plan
                    and VIENDO.id_asignatura = ASIG_PRERE.cod_asignatura_prerequisito
                where VIENDO.tipo_linea = 'CURSADAS'
                and VIENDO.nota_alfabetica = 'SIN CALIFICACIÓN'
                and VIO.id_asignatura in (Select distinct C1.cod_asignatura_prerequisito from W3SIADNA5.sia_vm_asig_prerequisitos C1 
                                            inner join W3SIADNA5.SIA_VM_ASIGNATURAS C2
                                                on c1.cod_asignatura_prerequisito = c2.cod_asignatura
                                            WHERE C2.vigente = 'VIGENTE' 
                                            and C1.periodo = (Select anyaca from talu_anyacademic where flgatimat = 'S')
                                            and c1.cod_asignaura in (:p_asignatura)
                                            and c1.cod_plan = VIENDO.cod_plan
                                            and C1.cod_asignatura_prerequisito != VIENDO.id_asignatura)
                and VIO.tipo_linea = 'CURSADAS'
                and VIO.nota_alfabetica = 'APROBADA'
                group by VIENDO.cod_plan, VIENDO.id_asignatura, ASIG_PRERE.asignatura
                having count(VIO.id_asignatura) >= (Select count(distinct C1.cod_asignatura_prerequisito) from W3SIADNA5.sia_vm_asig_prerequisitos C1 
                                                        inner join W3SIADNA5.SIA_VM_ASIGNATURAS C2
                                                            on c1.cod_asignatura_prerequisito = c2.cod_asignatura
                                                        WHERE C2.vigente = 'VIGENTE' 
                                                        and C1.periodo = (Select anyaca from talu_anyacademic where flgatimat = 'S')
                                                        and c1.cod_asignaura in (:p_asignatura)
                                                        and c1.cod_plan = VIENDO.cod_plan
                )-1
),

PRO_APRO_PRE_REQU as (Select distinct C1.cod_plan, C1.id_asignatura, ASIG_PRERE.asignatura, count(nota_alf) aprobados_pre_requisito, nota_alf from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1
                        inner join ASIG_PRERE
                            on C1.cod_plan = ASIG_PRERE.cod_plan
                            and C1.id_asignatura = ASIG_PRERE.cod_asignatura_prerequisito
                        where tipo_linea =  'CURSADAS'
                        and nota_alf = 'AP'
                        and TO_NUMBER(SUBSTR(C1.periodo, 1, 4))>= ((select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) from w3siadna5.SIA_VM_EST_APERTURA )-10) 
                        group by tipo_linea, nota_alf, C1.cod_plan, C1.id_asignatura, ASIG_PRERE.asignatura
), 

EST_ASIG_PRE_REQ as (Select distinct C1.id_asignatura, C1.cod_plan, count(C1.cod_plan) est_inscritos_prerequisito from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1
                        inner join ASIG_PRERE
                            on C1.cod_plan = ASIG_PRERE.cod_plan
                            and C1.id_asignatura = ASIG_PRERE.cod_asignatura_prerequisito
                        where periodo in (Select anyaca from talu_anyacademic where flgatimat = 'S')
                        group by C1.cod_plan, C1.id_asignatura
),

MEDIANA_PRE_REQU as (Select C1.cod_plan, C1.id_asignatura, C1.asignatura, MEDIAN(NUM_MATRICULAS_NUM) median_prim_insc from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1
                        inner join ASIG_PRERE
                            on C1.cod_plan = ASIG_PRERE.cod_plan
                            and C1.id_asignatura = ASIG_PRERE.cod_asignatura_prerequisito
                        where tipo_linea =  'CURSADAS'
                        and numins = '1'
                        and TO_NUMBER(SUBSTR(C1.periodo, 1, 4))>= ((select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) from w3siadna5.SIA_VM_EST_APERTURA )-10) 
                        group by C1.id_asignatura, C1.cod_plan, C1.asignatura
),

PORC_REPRO_PRE_REQU as (Select C1.cod_plan, C1.id_asignatura, C1.asignatura, count(nota_alf) reprobados_pre_requisito, nota_alf from W3SIADNA5.SIA_VM_EST_ASIGNATURAS C1
                            inner join ASIG_PRERE
                                on C1.cod_plan = ASIG_PRERE.cod_plan
                                and C1.id_asignatura = ASIG_PRERE.cod_asignatura_prerequisito
                            where tipo_linea =  'CURSADAS'
                            and nota_alf = 'RE'
                            and TO_NUMBER(SUBSTR(C1.periodo, 1, 4))>= ((select max(TO_NUMBER(SUBSTR(Apertura, 1, 4))) from w3siadna5.SIA_VM_EST_APERTURA )-10) 
                            group by tipo_linea, nota_alf, C1.cod_plan, C1.id_asignatura, C1.asignatura
)


Select distinct PLANES.cod_plan, PLANES.desc_prog_curricular, PLANES.desc_tipol, PLANES.cod_asignatura, PLANES.asignatura, 
NVL(APRO.aprobados,0) aprobados, NVL(REPRO.reprobados,0) reprobados, 
NVL(MEDIANA.median_prim_insc,0) median_prim_insc, NVL(MEDIANA.median_INFE,0) median_INFE, NVL(EST_INCRIP.est_inscritos,0) est_inscritos, 

--NVL(NOVISTO_NOAPRO_ASIG.est_ap_todos_prerreq,0) est_ap_todos_prerreq, 

NVL(ESTUDIA_MATR_MEDIAN.Num_estud_debajo_media,0) Num_estud_debajo_media,
NVL(PRIM_MATRI.Num_estud_primera_matricula,0) Num_estud_primera_matricula, NVL(DEMANDA3.numero_prerequisitos, 0) numero_prerequisitos, 
FALTA_UN_PREREQ.id_asignatura, FALTA_UN_PREREQ.asignatura asignatura_prere, NVL(FALTA_UN_PREREQ.est_sin_asig_falta_unprerre,0) est_sin_asig_falta_unprerre,
NVL(PRO_APRO_PRE_REQU.aprobados_pre_requisito,0) aprobados_pre_requisito, NVL(EST_ASIG_PRE_REQ.est_inscritos_prerequisito,0) est_inscritos_prerequisito,
NVL(MEDIANA_PRE_REQU.median_prim_insc,0) median_prim_insc_PRERE, NVL(PORC_REPRO_PRE_REQU.reprobados_pre_requisito,0) reprobados_pre_requisito FROM PLANES 
	inner join APRO 
		on PLANES.cod_plan = APRO.cod_plan 
		and PLANES.cod_asignatura = APRO.id_asignatura
	inner join REPRO
		on PLANES.cod_plan = REPRO.cod_plan 
		and PLANES.cod_asignatura = REPRO.id_asignatura
	inner join MEDIANA 
		on PLANES.cod_plan = MEDIANA.cod_plan 
		and PLANES.cod_asignatura = MEDIANA.id_asignatura
    inner join EST_INCRIP
        on PLANES.cod_plan = EST_INCRIP.cod_plan 
		and PLANES.cod_asignatura = EST_INCRIP.id_asignatura
    inner join PRIM_MATRI
        on PLANES.cod_plan = PRIM_MATRI.cod_plan
    left join ESTUDIA_MATR_MEDIAN
        on PLANES.cod_plan = ESTUDIA_MATR_MEDIAN.cod_plan
    left join NOVISTO_NOAPRO_ASIG
        on PLANES.cod_plan = NOVISTO_NOAPRO_ASIG.cod_plan
    left join DEMANDA3
        on PLANES.cod_plan = DEMANDA3.cod_plan
        and PLANES.cod_asignatura = DEMANDA3.cod_asignaura
    left join FALTA_UN_PREREQ
        on PLANES.cod_plan = FALTA_UN_PREREQ.cod_plan
    left join PRO_APRO_PRE_REQU
        on PLANES.cod_plan = PRO_APRO_PRE_REQU.cod_plan
        and PRO_APRO_PRE_REQU.id_asignatura = FALTA_UN_PREREQ.id_asignatura
    left join EST_ASIG_PRE_REQ
        on PLANES.cod_plan = EST_ASIG_PRE_REQ.cod_plan
        and EST_ASIG_PRE_REQ.id_asignatura = FALTA_UN_PREREQ.id_asignatura
        and EST_ASIG_PRE_REQ.id_asignatura = PRO_APRO_PRE_REQU.id_asignatura
    left join MEDIANA_PRE_REQU
        on PLANES.cod_plan = MEDIANA_PRE_REQU.cod_plan
        and MEDIANA_PRE_REQU.id_asignatura = FALTA_UN_PREREQ.id_asignatura
    left join PORC_REPRO_PRE_REQU
        on PLANES.cod_plan = PORC_REPRO_PRE_REQU.cod_plan
        and PORC_REPRO_PRE_REQU.id_asignatura = FALTA_UN_PREREQ.id_asignatura