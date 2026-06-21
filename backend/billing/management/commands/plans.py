billing_plan = [
    {
        "name": "Free",
        "description": "For individuals trying the product. Limited collaboration and projects.",
        "features": {
            "member_limit": 1,
            "project_limit": 3,
            "storage_gb": 1,

            # MVP: keep simple isolation first
            "guest_access": False,

            # OPTIONAL MVP (only if you already support live updates)
            "real_time_collaboration": False,

            # FUTURE FEATURE (not needed in MVP)
            # "integrations": False,

            # FUTURE FEATURE
            # "priority_support": False
        }
    },

    {
        "name": "Starter",
        "price": 2000,
        "description": "Perfect for individuals and small teams managing their first projects.",
        "features": {
            "member_limit": 5,
            "project_limit": 20,
            "storage_gb": 5,

            "guest_access": False,

            # OPTIONAL MVP (only if already built)
            "real_time_collaboration": True,

            # FUTURE FEATURES (skip in MVP unless already built)
            # "integrations": False,
            # "advanced_permissions": False,
            # "version_history": False,
            # "audit_logs": False,
            # "single_sign_on": False,
            # "custom_roles": False,

            # FUTURE FEATURE (support-level feature)
            # "priority_support": False
        }
    },

    {
        "name": "Pro",
        "price": 5000,
        "description": "For growing teams that need full collaboration and integrations.",
        "features": {
            "member_limit": 20,
            "project_limit": 100,
            "storage_gb": 50,

            "guest_access": True,

            # OPTIONAL MVP (only if realtime already exists)
            "real_time_collaboration": True,

            # FUTURE FEATURES (NOT MVP)
            # "integrations": True,
            # "advanced_permissions": True,
            # "version_history": True,
            # "audit_logs": False,
            # "single_sign_on": False,
            # "custom_roles": False,

            # FUTURE FEATURE
            # "priority_support": False
        }
    },

    {
        "name": "Business",
        "price": 15000,
        "description": "For larger organizations that need advanced security, scalability, and team management.",
        "features": {
            "member_limit": 100,
            "project_limit": 1000,
            "storage_gb": 500,

            "guest_access": True,
            "real_time_collaboration": True,

            # FUTURE / ENTERPRISE ONLY (not MVP at all)
            # "integrations": True,
            # "advanced_permissions": True,
            # "version_history": True,
            # "priority_support": True,
            # "audit_logs": True,
            # "single_sign_on": True,
            # "custom_roles": True
        }
    }
]
