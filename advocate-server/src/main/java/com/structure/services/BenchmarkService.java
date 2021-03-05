package com.structure.services;

import com.structure.models.Benchmark;
import com.structure.models.Tracking;
import com.structure.models.TrackingMeta;
import com.structure.models.Trial;
import com.structure.repositories.BenchmarkRepo;
import com.structure.utilities.constants.TrialTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class BenchmarkService {

    @Autowired
    private BenchmarkRepo br;
    private final NumberFormat nf = new DecimalFormat("0.0");

    public void updateBenchmarkTrialAverage(String bmId){
        System.out.println("Updating benchmark average for " + bmId);
        Benchmark bm = br.findById(bmId).orElseThrow();
        System.out.println("retrieved benchmark");
        double average = sumAllTrialAverages(bm.getTrials());
//        br.updateBenchmarkTrialAverage(average, bm.getId());
        bm.setTrialAverage(Double.parseDouble(nf.format(average/bm.getTrials().size())));
    }

    public double sumAllTrialAverages(List<Trial> trials){
        double average = 0.0;
        for(Trial t : trials){
            average += determineTrialAverage(t);
        }
        return average;
    }

    public double determineTrialAverage(Trial t){
        double average = 0.0;
        System.out.println("determining individual trial average");
        if(t.getTrialTemplate().equals(TrialTemplate.SCORE_BASIC)){
            List<TrackingMeta> meta = t.getTracking().getTrackingMeta();
            int correctCount = (int) meta.stream().filter(tracking -> tracking.getCorrect() == 1).count();
            double trialPercentage = Double.parseDouble(nf.format((double) correctCount / meta.size() * 100));
            System.out.println("Trial percentage: " + trialPercentage);
            average += trialPercentage;
        }else if(t.getTrialTemplate().equals(TrialTemplate.SCORE_BEST_OUT_OF)){
            Tracking tr = t.getTracking();
            System.out.println("trial accuracy: " + tr.getAccuracyPercentage());
            average += tr.getAccuracyPercentage();
        }
        return average;
    }

    public void setBenchmarkAverage(double avg, String bmId){
        br.updateBenchmarkTrialAverage(avg, bmId);
    }

}
